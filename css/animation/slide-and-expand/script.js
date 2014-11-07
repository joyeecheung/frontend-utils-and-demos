;(function(d, undefined){
	var btn = d.getElementById('btn');
	btn.addEventListener('click', function(e) {
		e.preventDefault();  // stop submit

		// clean up input
		var input = d.getElementById('new-comment-text');
		var value = input.value;
		input.value = "";

		// create a new comment div
		var comment = d.createElement('div');
		var para = d.createElement('p');
		para.textContent = value;
		comment.appendChild(para);
		comment.className = "comment hide";

		// put the new comment into DOM
		var comments = d.getElementById('old-comment')
		comments.insertBefore(comment, comments.firstChild);

		// need a timeout for the transition to show
		setTimeout(function() {
			comment.className = "comment";
		}, 10);
	});
})(document);