var sharingApp = (function () {

	var filePermissions = [
		"Create",
		"Download",
		"Rename",
		"View",
		"Move/Copy",
		"Share",
		"Edit",
		"Delete",
		"Read Permissions",
		"Change Permissions"
	];

	var folderPermissions = [
		"Create",
		"Download",
		"Rename",
		"View",
		"Move/Copy",
		"Share",
		"Add/Remove Files",
		"Delete",
		"Read Permissions",
		"Change Permissions"
	];

	var filesAndFolders = [
		{ id: 1, type: 'folder', name: 'Documents', isOwner: true },
		{ id: 2,  type: 'folder', name: 'Projects', isOwner: false },
		{ id: 3,  type: 'folder', name: 'Images', isOwner: false },
		{ id: 4,  type: 'folder', name: 'Music', isOwner: true },
		{ id: 5,  type: 'file', name: 'Resume.doc', isOwner: true },
		{ id: 6,  type: 'file', name: 'app.js', isOwner: false },
		{ id: 7,  type: 'file', name: 'Landscape.jpg', isOwner: true },
		{ id: 8,  type: 'file', name: 'Movie.mkv', isOwner: false },
		{ id: 9,  type: 'file', name: 'Essay.doc', isOwner: false }
	];

	function getItem(id) {
		for (var i in filesAndFolders) {
			if (filesAndFolders[i].id == id)
				return filesAndFolders[i];
		}
	}

	function shareClick() {
		alert('share!');
	}

	function buildItem(item) {
		var itemComposition = [
			'<li data-type="', item.type, '" data-owner="', item.owner, '" data-id="', item.id, '">',
			'<img src="', 'img/', item.type, '.png', '" />',
			'<span class="itemName">', item.name, '</span>',
			item.isOwner ? '<a href="#" class="itemShare" onclick="sharingApp.openSharePopup(this)">Share</a>' : '',
			'<span class="itemOwner">', item.isOwner ? "Owned" : "", '</span>',
			'</li>'
		].join('');

		return itemComposition;
	}

	function setupFolders() {
		for (var i in filesAndFolders) {
			var item = filesAndFolders[i];
			$('#itemsList').append(buildItem(item));
		}
	}

	function onUserSelected(user) {
		var currentUser = $("#userList li.selected");
		var permissions = currentUser.data('permissions');

		$('input:checkbox[name=ckPermission]').attr("checked", false);
		$('#ckFullControl').attr('checked', false);

		if (permissions) {
			var perms = permissions.split(',');
			for (var i in perms) {
				$(['input:checkbox[name=ckPermission][value=', perms[i], ']'].join('')).prop("checked", true);;
			}
		}

		var full = currentUser.data('fullControl');
		$('#ckFullControl').prop('checked', full);
	}

	function setupListbox() {
		$('.listBox.selectable li').click(function() {
			$('.listBox.selectable li').removeClass('selected');
			$(this).addClass('selected');
			onUserSelected(this);
		});
	}

	function fillPermissions(type) {
		var currentPerm = [];

		if (type == 'file')
			currentPerm = filePermissions;
		else if (type == 'folder')
			currentPerm = folderPermissions;

		var permList = $('#permissions');
		for (var i in currentPerm) {
			var item = ['<li><input type="checkbox" name="ckPermission" value="', i, '">', currentPerm[i], '<br></li>'].join('');
			permList.append(item);
		}

		$('input:checkbox[name=ckPermission]').change(function() {
			var allUsers = $('#ckAllUsers').is(':checked');

			var currUser = $("#userList li.selected");

			if (allUsers)
				currUser = $("#userList li");

			if (currUser) {
				var perms = $('input:checkbox[name=ckPermission]:checked').map(function(index, item) { return parseInt($(item).val()); }).get();
				currUser.data('permissions', perms.join(','));
			}

			if (!$(this).is(':checked')) {
				$('#ckFullControl').attr('checked', false);
				currUser.data('fullControl', false);
			}
		});
	}

	function setupDialog(clicked) {
		var id = parseInt($(clicked).parent().data('id'));
		var item = getItem(id);

		$('#popup img.ico').attr('src', ['img/', item.type, '.png'].join(''));
		$('#popup .fileName').text(item.name);
		fillPermissions(item.type);
	}

	function clearDialog() {
		$('#userName').val('');
		$('#userList').empty();
		$('#permissions').empty();
		$('#ckAllUsers').attr('checked', false);
		$('#ckFullControl').attr('checked', false);
		$('#ckGenerateLink').attr('checked', false);
	}

	$(document).ready(function() {
		setupFolders();
		setupListbox();

		$('#ckFullControl').change(function() {
			var allUsers = $('#ckAllUsers').is(':checked');

			var currUser = $("#userList li.selected");

			if (allUsers)
				currUser = $("#userList li");

			if ($(this).is(':checked')) {
				$('input:checkbox[name=ckPermission]').prop('checked', true);
				var perms = $('input:checkbox[name=ckPermission]:checked').map(function(index, item) { return parseInt($(item).val()); }).get();
				currUser.data('permissions', perms.join(','));
			}

			currUser.data('fullControl', $(this).is(':checked'));
		});

		alert('Clicking on Share for the files and folders will open the share popup.')
	});

	return {
		openSharePopup: function(clicked) {
			setupDialog(clicked);

			$('#popup').show();
		},
		share: function() {
			$('#popup').hide();
			clearDialog();
			alert('Shared!');
		},
		cancel: function() {
			clearDialog();
			$('#popup').hide();
		},
		addUser: function() {
			var text = $('#userName').val();
			if (!text) return;

			var li = $('<li>');
			li.text(text);
			li.click(function() {
				$('.listBox.selectable li').removeClass('selected');
				$(this).addClass('selected');
				onUserSelected($(this).data('permissions'));
			});
			$('#userList').append(li);
			$('#userName').val('');
		},
		uploadFile: function() {
			alert('Should open upload file dialog');
		},
		createFolder: function() {
			alert('Should open create folder dialog');
		}
	}
}) ();