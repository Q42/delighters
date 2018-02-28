/*
	Delighters - A tiny library to declaratively add CSS delighters to your page.

	(c) 2018 - Q42
	Written by Martin Kool
*/
var Delighters = new (function() {
	var self = this,
			dels = this.dels = [];

	document.addEventListener("DOMContentLoaded", function() {		
		document.addEventListener('scroll', scroll)
		var els = document.querySelectorAll('[data-delighter]');

		for (var i=0; i<els.length; i++) {
			var el 			= els[i],
					def 		= el.getAttribute('data-delighter', 2),
					pairs 	= def.split(';'),
					del 		= { start: 0.75, end: 0.75 };
			
			for (var j=0; j<pairs.length; j++) {
				var pair 	= pairs[j].split(':'),
						name 	= pair[0],
						val 	= isNaN(pair[1] * 1)? pair[1] : pair[1] * 1;
				if (name) del[name] = (val === undefined)? true : val;
			}

			del.el = el;
			del.id = dels.length;
			dels.push(del);
			el.classList.add('delighter')
			if (del.debug) el.style.outline = 'solid red 4px';
		}
		scroll();
	})

	function offset(el) {
    var de = document.documentElement,
    		box = el.getBoundingClientRect();
    return {
    	top: box.top + window.pageYOffset - de.clientTop,
    	left: box.left + window.pageXOffset - de.clientLeft
    }
	}

	function scroll() {
		var pos = self.getScrollPosition(),
				viewportHeight = window.innerHeight;
		for (var i=0; i<dels.length; i++) {
			var del = dels[i],
					top = offset(del.el).top,
					bottom = top + del.el.offsetHeight,
					factorStart = Math.max(0, 1 - (pos - top + viewportHeight) / viewportHeight),
					factorEnd = Math.max(0, 1 - (pos - bottom + viewportHeight) / viewportHeight);

			if (del.debug) {
				if (factorStart >= 0 && factorStart <= 1) {
					if (!del.startLine) {
						del.startLine = document.createElement('div')
						document.body.appendChild(del.startLine);
						del.startLine.style = 'position:fixed;height:0;width:100%;border-bottom:dotted red 2px;top:' + (del.start * 100) + 'vh';
					}
				}
				if (((factorEnd < del.end) || (factorStart > 1)) && del.startLine) {
					del.startLine.parentNode.removeChild(del.startLine);
					delete del.startLine;
				}
			}
			if (factorStart < del.start && !del.started) {
				del.started = true;
				del.el.classList.add('started')
			}
			else if (factorStart > del.start && del.started) {
				del.started = false;
				del.el.classList.remove('started')
			}
			if (factorEnd < del.end && !del.ended) {
				del.ended = true;
				del.el.classList.add('ended')
			}
			else if (factorEnd > del.end && del.ended) {
				del.ended = false;
				del.el.classList.remove('ended')
			}
		}
	}

	this.getScrollPosition = function() {
		return window.pageYOffset;
	}

})();