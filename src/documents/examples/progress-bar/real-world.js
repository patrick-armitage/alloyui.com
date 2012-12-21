AUI().ready('aui-progressbar', 'async-queue', 'node-load', function(A) {
	var content = A.one('#loadcontent');

	var progressBar = new A.ProgressBar({
		boundingBox: '#progressBar',
		contentBox: '.pbar',
		label: 'Ready to load',
		value: '0',
		on: {
			complete: function(e) {
				this.set('label', 'Complete!');
				content.load('assets/content.html');
			}
		}
	}).render();

	var step = 0;
	var steptask = new A.AsyncQueue({
		fn: function() {
			++step;

			progressBar.set('label', 'Loading... ' + step + '%');
			progressBar.set('value', step);
		},
		timeout: 1,
		iterations: 100
	});

	A.one('.load').on('click', function() {
		steptask.run();
	});
});