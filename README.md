# etdb-dev/beta-sign-up

## Gulp Tasks
### Main

| Task | Depends | Does |
|------|---------|------|
| default | clean, sass, minify-css | – |
| dev  | default | star browser-sync, watch source files |

### Specific
| Task | Depends | Does |
|------|---------|------|
| clean | – | deletes all files in `css/dist` |
| sass | – | compiles `styles/scss/*.scss` -> `styles/css/*.css` |
| minify-css | – | minfies `styles/css/*.css` -> `styles/dist/*.min.css` |
