export const pages = [
	`
    <div id="shipping" class="fs sec stepps shipping-info">
								<h1>Shipping Information</h1>
								<span class="inputed-info"
									>Please enter your shipping information</span
								>
								<div class="flex-form">
									<div class="form-group">
										<div class="form-field">
											<label for="">Contact Name</label>
											<input
												type="text"
												name=""
												id="ship-name"
												placeholder="Contact Name"
												class="address1"
												value="Jubril Bolajoko" />
										</div>
										<div class="form-field">
											<label for="">Street Address</label>
											<input
												class="address1"
												type="text"
												name=""
												id="ship-add1"
												value="1304 Martin Luther King Dr"
												placeholder="" />
										</div>
										<div class="form-field">
											<label for="">Street Address 2</label>
											<input
												type="text"
												class=""
												name=""
												id="ship-add2"
												value=""
												placeholder="Address 2" />
										</div>
										<div class="form-field">
											<label for="City">City</label>
											<input
												type="text"
												class="address1"
												name=""
												id="ship-city"
												value="Baton Rouge"
												placeholder="City" />
										</div>
									</div>
									<div class="form-group">
										<div class="form-field">
											<label for="">State</label>
											<input
												type="text"
												class="address1"
												name=""
												id="ship-state"
												value="Colorado"
												placeholder="State" />
										</div>
										<div class="form-field">
											<label for="">Zipcode</label>
											<input
												type="text"
												class="address1"
												name=""
												id="ship-zipcode"
												value="11002"
												placeholder="Zipode" />
										</div>
										<div class="form-field">
											<label for="">Country</label>
											<input
												type="text"
												class="address1"
												name=""
												id="ship-country"
												value="USA"
												placeholder="Country" />
										</div>
										<div class="form-field">
											<label for="">Mobile Number</label>
											<input
												class="address1"
												type="text"
												name=""
												id="ship-phone"
												value="8188828891"
												placeholder="Mobile Number" />
										</div>
									</div>
								</div>
								<div class="check-b">
									<label class="option container">
										<input type="checkbox" name="" id="matchaddress" />
										<span class="checkmark"></span>
										<p class="checck">Same as Billing Address</p>
									</label>
								</div>
							</div>`,
	`<div id="billing" class="fs sec stepps shipping-info">
								<h1>Billing Information</h1>
								<span class="inputed-info"
									>Please enter your billing information</span
								>

								<div class="flex-form">
									<div class="form-group">
										<div class="form-field">
											<label for="">Contact Name</label>
											<input
												type="text"
												name=""
												id="bill-name"
												placeholder="Contact Name"
												class="address2" />
										</div>
										<div class="form-field">
											<label for="">Street Address</label>
											<input
												class="address2"
												type="text"
												name=""
												id="bill-add1"
												placeholder="Street Address" />
										</div>
										<div class="form-field">
											<label for="">Street Address 2</label>
											<input
												type="text"
												class=""
												name=""
												id="bill-add2"
												placeholder="Address 2" />
										</div>
										<div class="form-field">
											<label for="City">City</label>
											<input
												type="text"
												class="address2"
												name=""
												id="bill-city"
												placeholder="City" />
										</div>
									</div>
									<div class="form-group">
										<div class="form-field">
											<label for="">State</label>
											<input
												type="text"
												class="address2"
												name=""
												id="bill-state"
												placeholder="State" />
										</div>
										<div class="form-field">
											<label for="">Zipcode</label>
											<input
												type="text"
												class="address2"
												name=""
												id="bill-zipcode"
												placeholder="Zipode" />
										</div>
										<div class="form-field">
											<label for="">Country</label>
											<input
												type="text"
												class="address2"
												name=""
												id="bill-country"
												placeholder="Country" />
										</div>
										<div class="form-field">
											<label for="">Mobile Number</label>
											<input
												class="address2"
												type="text"
												name=""
												id="bill-phone"
												placeholder="Mobile Number" />
										</div>
									</div>
								</div>
							</div>`,
	`<div id="review" class="fs stepps payment-info">
								<div class="inputed-info"></div>
								<div class="form-section">
									<div class="sec credit-card psec">
										<h1 class="pi">Review your information</h1>
										<div class="review">
											<div class="address">
												<div class="ads shipping" id="ads"></div>
												<div class="ads billing" id="ads"></div>
											</div>
											<div class="total-review">
												<span class="shipp">Shopping details</span>
												<div class="item-box">
													<ul id="shopping-details"></ul>
												</div>
												<div class="finalbreakdown">
													<div class="brkdiv">
														<h1 id="tt">Subtotal</h1>
														<h1 id="tt">$ <span id="sub-total"></span></h1>
													</div>
													<div class="brkdiv">
														<h1 id="tt">Delivery Fee</h1>
														<h1 id="tt">$ <span id="del-fee"></span></h1>
													</div>
													<sub>10% Discount</sub>
													<hr />
													<div class="brkdiv total">
														<h1 id="tt2">Total</h1>
														<h1 id="tt2">$ <span id="total"></span></h1>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>`,
	`<div id="payment" class="fs stepps payment-info">
								<div class="inputed-info"></div>
								<div class="form-section">
									<div class="sec credit-card psec">
										<h1 class="pi">Payment Information</h1>
										<div class="card-form">
											<form action="" id="payment-form">
												<div id="payment-element"><h1>Loading...</h1></div>
												<!-- <button id="payButton" class="check-out"></button> -->
											</form>
										</div>
									</div>
								</div>
							</div>`,
	`
    <div class="fs sec confirmation-code">
								<h1 class="ordercom">Order Completed</h1>
								<div class="thank-you-content">
									<img src="assets/images/order.png" alt="" />
									<div class="confirm-note">
										<h1>Thank you!</h1>
										<p>
											Your order has been placed. Your confirmation code is
											<strong>A25GJE200OD93J24</strong>
										</p>
									</div>
								</div>
							</div>`,
];
