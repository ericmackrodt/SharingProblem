Sharing Problem solution
========================

This is a simple mock interface for Covata's "Sharing Problem". The UI is semi-functional. Since the objective is to mock the interface, I didn't bother to write clean JS code.

Brief Explanation
-----------------

For the interface I chose to create a popup dialog where the user can add the users that he wants to share the folder or file with. The user can select specific permissions or give full control to each user or to all of them.
There's also a checkbox to generate a link for the sharing.

Other Ideas
-----------

1. After sharing, the users would receive a notification (on the app or via email).
2. Each file or folder should have buttons to edit, download, view, delete etc. These options would be enabled or disabled based on the user's permissions.
3. If the user has the permission to share, the share link should be shown even if he doesn't own the file or folder.

Permissions
-----------

The Solution contains 20 permissions, 10 for files and 10 for folders, most of them are basically the same.

File Permissions
----------------

1. Create
2. Download
3. Rename
4. View
5. Move/Copy
6. Share
7. Edit
8. Delete
9. Read Permissions
10. Change Permissions

Folder Permissions
------------------

1. Create
2. Download
3. Rename
4. View
5. Move/Copy
6. Share
7. Add/Remove Files
8. Delete
9. Read Permissions
10. Change Permissions