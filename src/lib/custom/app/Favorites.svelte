<script>
	export let favs = [];
</script>

<div class="header-notifications">
	<div class="header-notifications-trigger">
		<button
			type="button"
			on:click={() => window.open('https://forms.gle/VZcJ3aKd82jwP1k1A', '_blank')}
			class="btn btn-outline-primary btn-xs fs-6 me-2">Submit a Tool</button
		>
	</div>
</div>

<!-- favorites -->
<!-- <div class="header-notifications">
	<div class="header-notifications-trigger">
		 <a href="#" class="text-primary icon-link-hover link-success fs-4">
			<i class="bi bi-bookmark-heart-fill" />
		</a> 
	</div>

	<div class="header-notifications-dropdown">
		<div class="header-notifications-headline">
			<h4>Favorites 1</h4>
			<button
				class="mark-as-read ripple-effect-dark"
				title="Mark all as read"
				data-tippy-placement="left"
			>
				<i class="icon-feather-check-square" />
			</button>
		</div>

		<div class="header-notifications-content">
			<div class="header-notifications-scroll">
				<ul>
					<li class="notifications-not-read">
						<a href="#">
							<span class="notification-avatar status-online"
								><img src="/images/user-avatar-small-03.jpg" alt="" /></span
							>
							<div class="notification-text">
								<strong>David Peterson</strong>
								<p class="notification-msg-text">
									Thanks for reaching out. I'm quite busy right now on many...
								</p>
								<span class="color">4 hours ago</span>
							</div>
						</a>
					</li>

					<li class="notifications-not-read">
						<a href="#">
							<span class="notification-avatar status-offline"
								><img src="/images/user-avatar-small-02.jpg" alt="" /></span
							>
							<div class="notification-text">
								<strong>Sindy Forest</strong>
								<p class="notification-msg-text">
									Hi Tom! Hate to break it to you, but I'm actually on vacation until...
								</p>
								<span class="color">Yesterday</span>
							</div>
						</a>
					</li>

					<li class="notifications-not-read">
						<a href="#">
							<span class="notification-avatar status-online"
								><img src="/images/user-avatar-placeholder.png" alt="" /></span
							>
							<div class="notification-text">
								<strong>Marcin Kowalski</strong>
								<p class="notification-msg-text">I received payment. Thanks for cooperation!</p>
								<span class="color">Yesterday</span>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<a href="/messages" class="header-notifications-button ripple-effect button-sliding-icon"
			>View All Messages<i class="icon-material-outline-arrow-right-alt" /></a
		>
	</div>
</div> -->

<style>
	.btn-xs {
		padding: 0.4rem 0.4rem;
		font-size: 0.6rem;
		line-height: 1;
		border-radius: 0.2rem;
	}
</style>
