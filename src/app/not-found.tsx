    import Navbar from "@/components/navbar";
    import Footer from "@/components/footer";
    import Link from 'next/link';
    import Image from "next/image";

    import 'bootstrap/dist/css/bootstrap.min.css';
    import "@/styles/notfound.css";
    
    export default function NotFound() {
    return (
        <body>
      <Navbar />
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-7 text-center">
            <Image src="/images/erro_404.png" alt="Imagem de erro 404" className="img-fluid" width={600} height={400}/>
          </div>
          <div className="col-md-5 text-center">
            <h2>Ops! Não encontramos a página...</h2>
            <p className="lead">
              E olha que exploramos o universo procurando por ela! Que tal voltar e tentar novamente?
            </p>
            <Link href="/" className="btn btn-custom">Voltar ao início</Link>
          </div>
        </div>
      </div>
      <Footer />
    </body>
    )
    }