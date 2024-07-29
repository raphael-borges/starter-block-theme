import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import "./style.scss";
import metadata from "./block.json";

export default function save() {
	return (
		<>
			<nav className="navbar-theme">
				<button
					className="burger"
					id="burger"
					aria-label={__("Open Menu", metadata.textdomain)}
					aria-expanded="false"
				>
					<span className="burger-line"></span>
					<span className="burger-line"></span>
					<span className="burger-line"></span>
				</button>
				<div className="navbar-theme-block" id="menu">
					<ul className="menu">
						<li className="menu-item">
							<a href="#" className="menu-link">
								Home
							</a>
						</li>

						<li className="menu-item dropdown">
							<span className="dropdown-toggle menu-link">
								Courses <i className="bx bx-chevron-down"></i>
							</span>
							<div className="dropdown-content">
								<div className="dropdown-column">
									<div className="dropdown-group">
										<div className="dropdown-title">
											<span className="dropdown-icon">
												<i className="bx bx-code"></i>
											</span>
											<span className="text-base font-medium">
												Web Development
											</span>
										</div>
										<ul className="dropdown-items">
											<li>
												<a href="#" className="dropdown-link">
													Web Development Bootcamp
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													HTML and CSS for Beginner
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													Complete Modern JavaScript
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													Complete React with Redux
												</a>
											</li>
										</ul>
									</div>
									<div className="dropdown-group">
										<div className="dropdown-title">
											<span className="dropdown-icon">
												<i className="bx bx-devices"></i>
											</span>
											<span className="text-base font-medium">Web Design</span>
										</div>
										<ul className="dropdown-items">
											<li>
												<a href="#" className="dropdown-link">
													Web Design Bootcamp
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													Responsive Web Design
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													Figma for Web Designer
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													Webflow for Beginners
												</a>
											</li>
										</ul>
									</div>
									<div className="dropdown-group">
										<div className="dropdown-title">
											<span className="dropdown-icon">
												<i className="bx bx-bookmark"></i>
											</span>
											<span className="text-base font-medium">
												Certification
											</span>
										</div>
										<ul className="dropdown-items">
											<li>
												<a href="#" className="dropdown-link">
													Free Certificates
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													Courses Certificates
												</a>
											</li>
											<li>
												<a href="#" className="dropdown-link">
													Premium Certificates
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<li className="menu-item">
							<a href="#" className="menu-link">
								Support
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
