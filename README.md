# sweng861_FA24_001_group4
Talent Management System project for SWENG 861, Software Construction, Fall 2024

---

## Git Branching Strategy

This repository follows a structured Git branching strategy to ensure stability, facilitate collaboration, and manage releases effectively. Below are the guidelines for creating and managing branches.

### 1. Main Branches

- **`main`**: This is the stable, production-ready branch. All code here should be thoroughly tested and ready for deployment.
- **`develop`**: This is the integration branch where all feature branches merge. This branch is used for ongoing development and testing.

### 2. Supporting Branches

- **Feature Branches**: Used for developing new features.
  - **Naming Convention**: `feature/short-description`
  - **Base Branch**: Always branch off from `develop`.
  - **Example**: `feature/add-login`

- **Release Branches**: Used for preparing a new release.
  - **Naming Convention**: `release/version-number`
  - **Base Branch**: Always branch off from `develop`.
  - **Example**: `release/1.0.0`

- **Hotfix Branches**: Used for urgent fixes in the `main` branch.
  - **Naming Convention**: `hotfix/short-description`
  - **Base Branch**: Always branch off from `main`.
  - **Example**: `hotfix/critical-bug`

### 3. Branch Management Workflow

#### Feature Branches
1. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/short-description develop
   ```
2. **Work on the Feature**: Make your changes and commit them.
3. **Push the Feature Branch**:
   ```bash
   git push -u origin feature/short-description
   ```
4. **Create a Pull Request**: Open a pull request (PR) to merge the feature branch into `develop`.
5. **Merge After Approval**: Once the PR is approved and tests pass, merge the branch into `develop`.

#### Release Branches
1. **Create a Release Branch**:
   ```bash
   git checkout -b release/version-number develop
   ```
2. **Prepare the Release**: Finalize and test the code.
3. **Push the Release Branch**:
   ```bash
   git push -u origin release/version-number
   ```
4. **Create a Pull Request**: Open PRs to merge the release branch into both `main` and `develop`.
5. **Tag the Release**: After merging into `main`, tag the release:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

#### Hotfix Branches
1. **Create a Hotfix Branch**:
   ```bash
   git checkout -b hotfix/short-description main
   ```
2. **Apply the Fix**: Make your changes and commit them.
3. **Push the Hotfix Branch**:
   ```bash
   git push -u origin hotfix/short-description
   ```
4. **Create a Pull Request**: Open PRs to merge the hotfix branch into both `main` and `develop`.
5. **Merge After Approval**: Once the PR is approved, merge the branch.

### 4. Additional Guidelines

- **Pull Requests**: Ensure all PRs are reviewed and pass automated tests before merging.
- **Branch Deletion**: After merging, consider deleting the feature, release, or hotfix branch to keep the repository clean.
- **Branch Protection**: The `main` and `develop` branches are protected. Direct commits to these branches are restricted.
