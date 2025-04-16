'use client';

import '@/styles/style.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ServicosPage() {
  return (
      <>
        <Navbar />
        <div className="container py-5">
          <h2 className="mb-3">Nossos Serviços</h2>
            <div className="linha-destaque mb-4"></div>
            <div className="row">
              <div className="col-12">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id eleifend purus, in consectetur tellus. Sed eget mi enim. Pellentesque volutpat ex consequat, condimentum orci eu, cursus nunc. Quisque rutrum gravida enim, sit amet semper lacus consequat ut. Fusce porta augue quis eros placerat interdum. Cras condimentum lacus vitae dignissim consectetur. Curabitur eu ligula vel sem blandit varius ac ac ex. Donec pharetra nulla orci, quis porttitor est tempus at. Ut iaculis dolor iaculis libero eleifend, eu lacinia lectus hendrerit. Aliquam dapibus leo id est porta, quis laoreet arcu venenatis. Nulla consectetur odio ut dolor vehicula, eu dictum metus tempor.</p>
                <p>Aenean sagittis nisl ac elit maximus, ut ornare leo dictum. Duis non dignissim tortor. Donec consectetur id est id egestas. Duis varius vel augue vel fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla non sem nisl. Nulla maximus faucibus odio eu mollis. Morbi feugiat, nisi eu hendrerit venenatis, enim tellus venenatis mauris, vel consectetur ante libero at enim. Morbi posuere consequat orci, sed hendrerit felis lobortis ut. Integer bibendum lacus vel quam porttitor, sed tempor enim aliquet. Fusce dui ante, posuere egestas lectus et, maximus feugiat quam. Vivamus pellentesque ligula id urna condimentum varius. Praesent rutrum non risus quis pretium. In ante lectus, gravida et vestibulum convallis, dignissim id massa.</p>
              </div>
            </div>
              <div className="row">
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3 className="card-title">Conta Corrente</h3>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula urna sit amet orci dictum, quis posuere lorem dignissim.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3 className="card-title">Conta PJ</h3>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer efficitur ante sit amet odio mollis, sed malesuada sem vehicula.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3 className="card-title">Cartão de Crédito</h3>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus turpis et lectus dictum, vitae cursus est vehicula.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
      </>
  );
}