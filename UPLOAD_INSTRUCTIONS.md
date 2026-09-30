# How to Upload Stack It to GitHub

Since the automated push isn't working, here's how to manually upload your code:

## Option 1: Using Git Command Line (Recommended)

1. Open your terminal in this project directory
2. Run these commands:

```bash
# Add the remote repository
git remote add origin https://github.com/AshwinV-jpg/Stack-It.git

# Push to GitHub
git push -u origin main
```

3. When prompted for credentials:
   - **Username**: Your GitHub username (AshwinV-jpg)
   - **Password**: Use a Personal Access Token (NOT your GitHub password)

### How to Create a Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Stack It Upload"
4. Check the "repo" scope
5. Click "Generate token"
6. Copy the token and use it as your password

## Option 2: Upload via GitHub Web Interface

1. Go to https://github.com/AshwinV-jpg/Stack-It
2. Click "uploading an existing file"
3. Drag and drop all files from this directory
4. Commit the changes

## Option 3: Use GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. File → Add Local Repository → Select this folder
3. Publish repository to GitHub

---

Your code is ready to push with:
- 126 files committed
- Complete game with all assets
- README.md documentation
- Proper .gitignore
