import { Octokit } from '@octokit/rest';
import { logger } from '../utils/logger.js';
import { CONFIG } from '../utils/config.js';

export class GitHubService {
  constructor() {
    if (!CONFIG.GITHUB_TOKEN) {
      throw new Error('GitHub token is required');
    }
    this.octokit = new Octokit({ auth: CONFIG.GITHUB_TOKEN });
  }

  async createPullRequest(files) {
    const { owner, repo } = CONFIG.options.github;
    const branchName = `docs/update-${Date.now()}`;
    
    try {
      // Get default branch
      const { data: repository } = await this.octokit.rest.repos.get({
        owner,
        repo
      });

      // Create branch from default
      await this.octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: repository.default_branch
      });

      // Commit files
      for (const file of files) {
        const content = Buffer.from(file.content).toString('base64');
        await this.octokit.rest.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: file.path,
          message: `docs: Update ${file.path}`,
          content,
          branch: branchName
        });
      }

      // Create PR
      const { data: pr } = await this.octokit.rest.pulls.create({
        owner,
        repo,
        title: 'docs: Update documentation',
        body: CONFIG.options.github.prTemplate,
        head: branchName,
        base: repository.default_branch
      });

      logger.success(`Pull request created: ${pr.html_url}`);
      return pr;
    } catch (error) {
      throw new Error(`Failed to create pull request: ${error.message}`);
    }
  }

  async createOrUpdateFile({ owner, repo, path, content, branch, message }) {
    try {
      const contentEncoded = Buffer.from(content).toString('base64');
      
      // Try to get existing file
      let sha;
      try {
        const { data } = await this.octokit.repos.getContent({
          owner,
          repo,
          path,
          ref: branch
        });
        sha = data.sha;
      } catch (error) {
        // File doesn't exist yet, which is fine
      }

      await this.octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: contentEncoded,
        branch,
        sha
      });
    } catch (error) {
      throw new Error(`Failed to update file ${path}: ${error.message}`);
    }
  }
} 