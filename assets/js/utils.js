function openPopup() {
	const popUpWindow = document.getElementById('pop_up_window');
	const overlayWindow = document.getElementById('overlay');

	popUpWindow.style.display = "block";
	overlayWindow.style.display = "block";
}

function closePopUp() {
	const popUpWindow = document.getElementById('pop_up_window');
	const overlayWindow = document.getElementById('overlay');

	popUpWindow.style.display = "none";
	overlayWindow.style.display = "none";
}