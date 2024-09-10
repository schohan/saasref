<!-- Dashboard Container -->
<div class="dashboard-container">
	<!-- Dashboard Sidebar
	================================================== -->
	<div class="dashboard-sidebar">
		<div class="dashboard-sidebar-inner">
			<div class="dashboard-nav-container">
				<!-- Responsive Navigation Trigger -->
				<a href="#" class="dashboard-responsive-nav-trigger">
					<span class="hamburger hamburger--collapse">
						<span class="hamburger-box">
							<span class="hamburger-inner" />
						</span>
					</span>
					<span class="trigger-title">Dashboard Navigation</span>
				</a>

				<!-- Navigation -->
				<div class="dashboard-nav">
					<div class="dashboard-nav-inner">
						<ul data-submenu-title="Start">
							<li>
								<a href="dashboard.html"><i class="icon-material-outline-dashboard" /> Dashboard</a>
							</li>
							<li class="active">
								<a href="dashboard-messages.html"
									><i class="icon-material-outline-question-answer" /> Messages
									<span class="nav-tag">2</span></a
								>
							</li>
							<li>
								<a href="dashboard-bookmarks.html"
									><i class="icon-material-outline-star-border" /> Bookmarks</a
								>
							</li>
							<li>
								<a href="dashboard-reviews.html"
									><i class="icon-material-outline-rate-review" /> Reviews</a
								>
							</li>
						</ul>

						<ul data-submenu-title="Organize and Manage">
							<li>
								<a href="#"><i class="icon-material-outline-business-center" /> Jobs</a>
								<ul>
									<li>
										<a href="dashboard-manage-jobs.html"
											>Manage Jobs <span class="nav-tag">3</span></a
										>
									</li>
									<li><a href="dashboard-manage-candidates.html">Manage Candidates</a></li>
									<li><a href="dashboard-post-a-job.html">Post a Job</a></li>
								</ul>
							</li>
							<li>
								<a href="#"><i class="icon-material-outline-assignment" /> Tasks</a>
								<ul>
									<li>
										<a href="dashboard-manage-tasks.html"
											>Manage Tasks <span class="nav-tag">2</span></a
										>
									</li>
									<li><a href="dashboard-manage-bidders.html">Manage Bidders</a></li>
									<li>
										<a href="dashboard-my-active-bids.html"
											>My Active Bids <span class="nav-tag">4</span></a
										>
									</li>
									<li><a href="dashboard-post-a-task.html">Post a Task</a></li>
								</ul>
							</li>
						</ul>

						<ul data-submenu-title="Account">
							<li>
								<a href="dashboard-settings.html"
									><i class="icon-material-outline-settings" /> Settings</a
								>
							</li>
							<li>
								<a href="index-logged-out.html"
									><i class="icon-material-outline-power-settings-new" /> Logout</a
								>
							</li>
						</ul>
					</div>
				</div>
				<!-- Navigation / End -->
			</div>
		</div>
	</div>
	<!-- Dashboard Sidebar / End -->

	
	<!-- Dashboard Content
	================================================== -->
	<div class="dashboard-content-container">
		<div class="dashboard-content-inner">
			<!-- Dashboard Headline -->
			<div class="dashboard-headline">
				<h3>Messages</h3>

				<!-- Breadcrumbs -->
				<nav id="breadcrumbs" class="dark">
					<ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">Dashboard</a></li>
						<li>Messages</li>
					</ul>
				</nav>
			</div>

			<div class="messages-container margin-top-0">
				<div class="messages-container-inner">
					<!-- Messages -->
					<div class="messages-inbox">
						<div class="messages-headline">
							<div class="input-with-icon">
								<input id="autocomplete-input" type="text" placeholder="Search" />
								<i class="icon-material-outline-search" />
							</div>
						</div>

						<ul>
							<li>
								<a href="#">
									<div class="message-avatar">
										<i class="status-icon status-online" /><img
											src="images/user-avatar-small-03.jpg"
											alt=""
										/>
									</div>

									<div class="message-by">
										<div class="message-by-headline">
											<h5>David Peterson</h5>
											<span>4 hours ago</span>
										</div>
										<p>Thanks for reaching out. I'm quite busy right now on many</p>
									</div>
								</a>
							</li>

							<li class="active-message">
								<a href="#">
									<div class="message-avatar">
										<i class="status-icon status-offline" /><img
											src="images/user-avatar-small-02.jpg"
											alt=""
										/>
									</div>

									<div class="message-by">
										<div class="message-by-headline">
											<h5>Sindy Forest</h5>
											<span>Yesterday</span>
										</div>
										<p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
									</div>
								</a>
							</li>

							<li>
								<a href="#">
									<div class="message-avatar">
										<i class="status-icon status-offline" /><img
											src="images/user-avatar-placeholder.png"
											alt=""
										/>
									</div>

									<div class="message-by">
										<div class="message-by-headline">
											<h5>Sebastiano Piccio</h5>
											<span>2 days ago</span>
										</div>
										<p>Hello, I want to talk about my project if you don't mind!</p>
									</div>
								</a>
							</li>

							<li>
								<a href="#">
									<div class="message-avatar">
										<i class="status-icon status-online" /><img
											src="images/user-avatar-placeholder.png"
											alt=""
										/>
									</div>

									<div class="message-by">
										<div class="message-by-headline">
											<h5>Marcin Kowalski</h5>
											<span>2 days ago</span>
										</div>
										<p>Yes, I received payment. Thanks for cooperation!</p>
									</div>
								</a>
							</li>
						</ul>
					</div>
					<!-- Messages / End -->

					<!-- Message Content -->
					<div class="message-content">
						<div class="messages-headline">
							<h4>Sindy Forest</h4>
							<a href="#" class="message-action"
								><i class="icon-feather-trash-2" /> Delete Conversation</a
							>
						</div>

						<!-- Message Content Inner -->
						<div class="message-content-inner">
							<!-- Time Sign -->
							<div class="message-time-sign">
								<span>28 June, 2019</span>
							</div>

							<div class="message-bubble me">
								<div class="message-bubble-inner">
									<div class="message-avatar">
										<img src="images/user-avatar-small-01.jpg" alt="" />
									</div>
									<div class="message-text">
										<p>
											Thanks for choosing my offer. I will start working on your project tomorrow.
										</p>
									</div>
								</div>
								<div class="clearfix" />
							</div>

							<div class="message-bubble">
								<div class="message-bubble-inner">
									<div class="message-avatar">
										<img src="images/user-avatar-small-02.jpg" alt="" />
									</div>
									<div class="message-text">
										<p>Great. If you need any further clarification let me know. 👍</p>
									</div>
								</div>
								<div class="clearfix" />
							</div>

							<div class="message-bubble me">
								<div class="message-bubble-inner">
									<div class="message-avatar">
										<img src="images/user-avatar-small-01.jpg" alt="" />
									</div>
									<div class="message-text"><p>Ok, I will. 😉</p></div>
								</div>
								<div class="clearfix" />
							</div>

							<!-- Time Sign -->
							<div class="message-time-sign">
								<span>Yesterday</span>
							</div>

							<div class="message-bubble me">
								<div class="message-bubble-inner">
									<div class="message-avatar">
										<img src="images/user-avatar-small-01.jpg" alt="" />
									</div>
									<div class="message-text">
										<p>
											Hi Sindy, I just wanted to let you know that project is finished and I'm
											waiting for your approval.
										</p>
									</div>
								</div>
								<div class="clearfix" />
							</div>

							<div class="message-bubble">
								<div class="message-bubble-inner">
									<div class="message-avatar">
										<img src="images/user-avatar-small-02.jpg" alt="" />
									</div>
									<div class="message-text">
										<p>
											Hi Tom! Hate to break it to you, but I'm actually on vacation 🌴 until Sunday
											so I can't check it now. 😎
										</p>
									</div>
								</div>
								<div class="clearfix" />
							</div>

							<div class="message-bubble me">
								<div class="message-bubble-inner">
									<div class="message-avatar">
										<img src="images/user-avatar-small-01.jpg" alt="" />
									</div>
									<div class="message-text">
										<p>Ok, no problem. But don't forget about last payment. 🙂</p>
									</div>
								</div>
								<div class="clearfix" />
							</div>

							<div class="message-bubble">
								<div class="message-bubble-inner">
									<div class="message-avatar">
										<img src="images/user-avatar-small-02.jpg" alt="" />
									</div>
									<div class="message-text">
										<!-- Typing Indicator -->
										<div class="typing-indicator">
											<span />
											<span />
											<span />
										</div>
									</div>
								</div>
								<div class="clearfix" />
							</div>
						</div>
						<!-- Message Content Inner / End -->

						<!-- Reply Area -->
						<div class="message-reply">
							<textarea cols="1" rows="1" placeholder="Your Message" />
							<button class="button ripple-effect">Send</button>
						</div>
					</div>
					<!-- Message Content -->
				</div>
			</div>
			<!-- Messages Container / End -->

			<!-- Footer -->
			<div class="dashboard-footer-spacer" />
			<div class="small-footer margin-top-15">
				<div class="small-footer-copyrights">
					© 2019 <strong>Hireo</strong>. All Rights Reserved.
				</div>
				<ul class="footer-social-links">
					<li>
						<a href="#" title="Facebook">
							<i class="icon-brand-facebook-f" />
						</a>
					</li>
				</ul>
				<div class="clearfix" />
			</div>
			<!-- Footer / End -->
		</div>
	</div>
	<!-- Dashboard Content / End -->
</div>
<!-- Dashboard Container / End -->
