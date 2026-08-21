# GitFlow Configuration

## Branch Strategy

- **main**: Production branch - triggers Netlify deployment
- **dev**: Development branch - for local build testing
- **feature/*** : Feature branches following pattern `feature/nome-da-branch/feat: detalhe sobre a mudanca`

## Workflow

1. Create feature branch from dev:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/nome-da-branch/feat: detalhe-sobre-mudanca
   ```

2. Push feature branch:
   ```bash
   git push origin feature/nome-da-branch/feat: detalhe-sobre-mudanca
   ```

3. **Auto PR created**: Pushing to feature branches automatically creates a PR to dev

4. Merge to dev for testing
5. **Auto PR to main**: Merging to dev automatically creates a PR to main
6. Merge to main for Netlify deployment

## GitHub Actions Workflows

### Build and Deploy (.github/workflows/webpack.yml)
- Runs on push to main and PR to dev
- Tests against Node.js 18.x, 20.x, 22.x
- Deploys to Netlify on main branch merges

### Auto Create PR (.github/workflows/auto-pr.yml)
- Automatically creates PR to dev when feature branches are pushed
- Follows branch naming convention

### PR to Main (.github/workflows/pr-to-main.yml)
- Automatically creates PR to main when PRs are merged to dev
- Creates release branch for production deployment

## Required GitHub Secrets

Configure these in GitHub repository settings → Secrets and variables → Actions:

- `NETLIFY_AUTH_TOKEN`: Your Netlify authentication token
- `NETLIFY_SITE_ID`: Your Netlify site ID

## Branch Protection Rules (Recommended)

Configure in GitHub repository settings → Branches:

### Main Branch
- Require pull request before merging
  - Require approvals: 1
- Require status checks to pass before merging
  - Build (from Build and Deploy workflow)
- Require branches to be up to date before merging
- Do not allow bypassing the above settings

### Dev Branch
- Require pull request before merging
  - Require approvals: 1
- Require status checks to pass before merging
  - Build (from Build and Deploy workflow)
- Require branches to be up to date before merging
- Do not allow bypassing the above settings

## Verification Commands

- Build: `npm run build`
- Lint: `npm run lint`
- Test local: `npm run dev`
