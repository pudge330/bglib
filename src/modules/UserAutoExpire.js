bglib.UserAutoExpire = bglib.create({
	el: undefined
	,modelId: undefined
	,modelTimer: undefined
	,keepAliveTimer: undefined
	,exp: undefined
	,warningDuration: undefined
	,warningTimeout: undefined
	,expireUrl: undefined
	,renewUrl: undefined
	,init: function(opts) {
		var _self = this;
		opts = opts || {};
		opts = Object.deepCopyMerge({
			exp: 1800 //--30 minutes
			,warningDuration: 60
			,expireUrl: '/logout'
			,renewUrl: '/api/keep-session-alive'
		}, opts);
		_self.exp = opts.exp;
		_self.warningDuration = opts.warningDuration;
		_self.expireUrl = opts.expireUrl;
		_self.renewUrl = opts.renewUrl;
		_self.el = {
			model: undefined
			,timer: undefined
		};
		_self.modelId = 'userAutoExpire' + bglib.fn.rand();
		_self.el.model = _self.attachModel(_self.modelId);
		_self.el.timer = _self.el.model.querySelector('#' + _self.modelId + '_timer');
		bglib.EventUtil.addHandler(_self.el.model.querySelector('.userAutoExpire_End'), 'click', function() {
			_self.endSession();
		});
		bglib.EventUtil.addHandler(_self.el.model.querySelector('.userAutoExpire_Keep'), 'click', function() {
			_self.continueSession();
		});
		_self.warningTimeout = new bglib.Timeout({
			time: _self.exp - _self.warningDuration
			,callback: function() {
				_self.promtUser();
			}
		});
		//--every 1/3 of the expTime, just to keep the session alive when no requests are made
		_self.keepAliveTimer = setInterval(function() {
			_self.keepAliveHandler();
		}, 1000 * parseInt(_self.exp / 3));
	}
	,promtUser: function() {
		var _self = this;
		this.el.timer.innerHTML = this.warningDuration + 's';
		this.revealModel();
		this.modelTimer = setInterval(function() {
			_self.countdownTimer();
		}, 1000);
	}
	,countdownTimer: function() {
		var left = parseInt(this.el.timer.innerHTML.replace('s', ''));
		if (left > 0) {
			this.el.timer.innerHTML = (left - 1) + 's';
		}
		else {
			this.endSession();
		}
	}
	,endSession: function() {
		this.hideModel();
		clearInterval(this.modelTimer);
		window.location = this.expireUrl;
	}
	,continueSession: function() {
		this.hideModel();
		this.el.timer.innerHTML = '--';
		clearInterval(this.modelTimer);
		this.modelTimer = null;
		this.warningTimeout.restart();
	}
	,keepAliveHandler: function() {
		bglib.fn.request(this.renewUrl);
	}
	,hideModel: function() {
		bglib.El.removeClass(this.el.model, 'opened');
		bglib.El.addClass(this.el.model, 'closed');
	}
	,revealModel: function() {
		bglib.El.removeClass(this.el.model, 'closed');
		bglib.El.addClass(this.el.model, 'opened');
	}
	,attachModel: function(id) {
		//--build/attach style tag here
		var css = "\
.userAutoExpire_container {\
position: fixed;\
top: 0;\
left: 0;\
right: 0;\
bottom: 0;\
background-color: rgba(0, 0, 0, 0.20);\
z-index: 10000;\
}\
.userAutoExpire_container.closed {\
display: none;\
}\
.userAutoExpire_container p {\
margin: 0;\
margin-bottom: 2rem;\
}\
.userAutoExpire_container p:last-child {\
margin: 0;\
}\
.userAutoExpire_wrap {\
height: 100%;\
}\
.userAutoExpire {\
width: 300px;\
background: #e9e9e9;\
position: relative;\
top: 50%;\
transform: translateY(-50%);\
margin: 0 auto;\
padding: 1rem;\
box-shadow:0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3);\
}\
.userAutoExpire_button {\
-webkit-appearance: none;\
-moz-appearance: none;\
line-height: 1;\
display: inline-block;\
text-align: center;\
cursor: pointer;\
transition: background-color 0.25s ease-out, color 0.25s ease-out;\
vertical-align: middle;\
border: 1px solid #222;\
border-radius: 0;\
padding: 0.8em 1em 0.7695em 1em;\
margin: 0;\
font-size: 0.9rem;\
background-color: #e9e9e9;\
color: #222;\
}\
.userAutoExpire_End {\
border-color: transparent;\
}\
.userAutoExpire_button:hover, .userAutoExpire_button:focus {\
text-decoration: underline;\
}\
.userAutoExpire_Keep:hover, .userAutoExpire_Keep:focus {\
color: #e9e9e9;\
background-color: #222;\
text-decoration: none;\
}\
.userAutoExpire_links {\
text-align: right;\
}\
";
		var style = document.createElement('style');
		style.type = "text/css";
		style.innerHTML = css;
		document.querySelector('head').appendChild(style);
		var body = document.querySelector('body');
		var node = bglib.El.element("" +
"<div id=\""+id+"_container\" class=\"userAutoExpire_container closed\" style=\"\">" +
"	<div id=\""+id+"_wrap\" class=\"userAutoExpire_wrap\">" +
"		<div id=\""+id+"\" class=\"userAutoExpire\">" +
"			<div id=\""+id+"_content\" class=\"userAutoExpire_content\">" +
"				<p class=\"userAutoExpire_message\">Session will expire in:&nbsp;<span id=\""+id+"_timer\" class=\"userAutoExpire_timer\">--</span></p>" +
"				<p class=\"userAutoExpire_links\"><button class=\"userAutoExpire_button userAutoExpire_End\">End Now</button>&nbsp;&nbsp;<button class=\"userAutoExpire_button userAutoExpire_Keep\">Keep Alive</button></p>" +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>"
		);
		body.appendChild(node);
		return node;
	}
});