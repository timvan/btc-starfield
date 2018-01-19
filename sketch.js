var stars = [];
var speed;
var transactions;
var n = 0;
var request_trxs = [];
var request_list = [];
var new_rqst = [];
var cache_rqst = [];
var for_else_switch = false;
var display_string = ""

function setup() {
	createCanvas(windowWidth, windowHeight);

	for (var i = 0; i < 1; i++) {
		stars[i] = new Star();
	}
};

function draw() {
	speed = map(mouseX, 0, width/2, 0, 50);
	background(0);
	translate(width / 2, height / 2);

	for(var i = 0; i < stars.length; i++){
		stars[i].update();
		stars[i].show();
	}

	textSize(20);
	display_string = "New transactions: " + str(request_list.length)
	text(display_string, - width / 2 + 20, - height / 2 + 40 );


	if(n % 40 == 0){
		create_transaction_list();
	};
	n += 1;
};

function create_transaction_list() {

	new_rqst = get_transactions();
	// console.log(new_rqst)

	for(var i = new_rqst.length - 1; i >= 0; i--){

		// console.log(new_rqst[i]);

		if(new_rqst[i] == request_list[request_list.length -1 ]){

			if(cache_rqst.length == 0){
				// console.log("cache empty")
				break;
			} else {
				
				for(var i = 0; i < cache_rqst.length; i++){
					request_list.push(cache_rqst.pop());
					// console.log("new transaction")
					// console.log(request_list.length)
					stars.push(new Star())
				};
				cache_rqst = [];
				// console.log("banked cache");
				
				break;
			}
			


		} else {
			cache_rqst.push(new_rqst[i]);
			//console.log("load cache");
		};

		if(i == 0){
			console.log("set switch");
			for_else_switch = true;
		};
		

	}

	if(for_else_switch) {
			for(var i = 0; i < cache_rqst.length; i++){
				request_list.push(cache_rqst.pop());
				// console.log("new transaction")
				// console.log(request_list.length)
				stars.push(new Star())
			};
			cache_rqst = [];
			for_else_switch = false;
			//console.log("set cache");
	};

	if(false) {
		if(request_list.length == 50){
			console.log(request_list);
			noLoop();

		};
	};
};


function get_transactions() {

	var url = "https://blockchain.info/unconfirmed-transactions?format=json&cors=true";
	httpGet(url, 'jsonp', false, function(response){
		transactions = response;
	});
	if(typeof transactions == "object"){
		request_trxs = []
		for(var i = 0; i < 10; i++){
			request_trxs.push(transactions.txs[i].hash);
		};
	};
	return request_trxs;
};



