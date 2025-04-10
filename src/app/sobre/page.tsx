'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@/styles/style.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function SobrePage() {
    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="mb-3">Sobre Nós</h2>
                <div className="linha-destaque mb-4"></div>
                <div className="row">
                    <div className="col-12">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id eleifend purus, in consectetur tellus. Sed eget mi enim. Pellentesque volutpat ex consequat, condimentum orci eu, cursus nunc. Quisque rutrum gravida enim, sit amet semper lacus consequat ut. Fusce porta augue quis eros placerat interdum. Cras condimentum lacus vitae dignissim consectetur. Curabitur eu ligula vel sem blandit varius ac ac ex. Donec pharetra nulla orci, quis porttitor est tempus at. Ut iaculis dolor iaculis libero eleifend, eu lacinia lectus hendrerit. Aliquam dapibus leo id est porta, quis laoreet arcu venenatis. Nulla consectetur odio ut dolor vehicula, eu dictum metus tempor.</p>
                        <p>Aenean sagittis nisl ac elit maximus, ut ornare leo dictum. Duis non dignissim tortor. Donec consectetur id est id egestas. Duis varius vel augue vel fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla non sem nisl. Nulla maximus faucibus odio eu mollis. Morbi feugiat, nisi eu hendrerit venenatis, enim tellus venenatis mauris, vel consectetur ante libero at enim. Morbi posuere consequat orci, sed hendrerit felis lobortis ut. Integer bibendum lacus vel quam porttitor, sed tempor enim aliquet. Fusce dui ante, posuere egestas lectus et, maximus feugiat quam. Vivamus pellentesque ligula id urna condimentum varius. Praesent rutrum non risus quis pretium. In ante lectus, gravida et vestibulum convallis, dignissim id massa.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Item 1
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id eleifend purus, in consectetur tellus. Sed eget mi enim. Pellentesque volutpat ex consequat, condimentum orci eu, cursus nunc. Quisque rutrum gravida enim, sit amet semper lacus consequat ut. Fusce porta augue quis eros placerat interdum. Cras condimentum lacus vitae dignissim consectetur. </p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Item 2
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id eleifend purus, in consectetur tellus. Sed eget mi enim. Pellentesque volutpat ex consequat, condimentum orci eu, cursus nunc. Quisque rutrum gravida enim, sit amet semper lacus consequat ut. Fusce porta augue quis eros placerat interdum. Cras condimentum lacus vitae dignissim consectetur. </p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Item 3
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id eleifend purus, in consectetur tellus. Sed eget mi enim. Pellentesque volutpat ex consequat, condimentum orci eu, cursus nunc. Quisque rutrum gravida enim, sit amet semper lacus consequat ut. Fusce porta augue quis eros placerat interdum. Cras condimentum lacus vitae dignissim consectetur. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
