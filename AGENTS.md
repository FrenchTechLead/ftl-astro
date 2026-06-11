# AGENTS

## Create a New Article

This repository provides a helper script to create a new blog post and its associated image folder.

### 1. Use the article creation script

Run the helper from the repository root with the article title as a single argument:

```bash
./_create_an_article.sh "My New Article Title"
```

This script does the following:
- generates a file name using the current date and a slugified title
- creates a folder under `public/assets/blog/tech/` for the article images
- copies the default placeholder image `public/assets/blog/tech/0.png` into the new folder
- creates a new MDX file in `src/content/posts/`

### 2. Check the generated post file

The new file is created in `src/content/posts/` with frontmatter and a basic skeleton:
- `authorID`
- `title`
- `description`
- `keywords`
- `tags`
- `lang`
- `draft: true`

The file also includes example imports for `Separator` and `Image`.

### 3. Update the article content

Open the new MDX file and update:
- the `description`
- the `keywords`
- the `tags`
- the content body
- any imported images

### 4. Add article assets

Add images to the new folder created in `public/assets/blog/tech/<slug>`.
Update imports in the MDX file to reference the correct image path.

### 5. Publish the article

When ready, set `draft: false` in the post frontmatter and commit the new post.

### Notes

- The current helper script uses `lang: en` and `draft: true` by default.
- The slug and file name are built from the current date and the title.
- If you need a different image folder or author, update the script or edit the generated MDX manually.
