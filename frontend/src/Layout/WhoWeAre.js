import React from 'react';

function WhoWeAre() {
	return (
		<section id="who-we-are" >
		<footer className="bg-light text-center text-lg-start py-5">
			<div className="col-md-12 text-center">
								<img src="./img/Eventum-IT-Solutions.jpg" alt="techedu creators" />
							</div>

			<div className="container p-4 ">

				<div className="row">

					<div className="col-lg-6 col-md-12 mb-4 mb-md-0 m">
						<h5 className="text-uppercase">Who We Are</h5>
						<hr className="bottom-border bottom-border-primary" />

						<div className="row">
							<div className="col-md-12 text-left">
								<p className="font-weight-bold mb-4">
									We are a team of passionate whose goal is to improve everyone's life through disruptive products.We build great
									products to solve your business problems.
		 					<br /> <br />
		 					Our products are designed for small to medium size companies to optimize their performance.
		 				</p>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-12 mb-4 mb-md-0">
						<h5 className="text-uppercase">Connect with us</h5>
						<hr className="bottom-border bottom-border-primary" />
						<div className='mb-2 row' >
						<i className="fas fa-envelope col-2"></i>
							<span className='col-10 text-left' >it@eventumsolutions.com</span>
						</div>
						<div className='mb-2 row' >
						<i className="fas fa-phone-alt col-2">	</i>
							<span className='col-10 text-left' >(+2) 03 427-0048</span>
						</div>
						<div className='mb-2 row' >
						<i className="fas fa-fax col-2 ">	</i>
							<span className='col-10 text-left' >(+2) 03 427-0049</span>
						</div>
						<div className='mb-2 row'  >
						<i className="fas fa-map-marker-alt  col-2">	</i>
							<span className='col-10 text-left' >Eventum IT Solutions Solitaire Tower, 14th of May Avenue Alexandria, Egypt </span>
						</div>
						
					</div>

				</div>

			</div>
		</footer>
		</section>
	);
}

export default WhoWeAre;
