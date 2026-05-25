export default function Home() {
  return (
    <main className="min-h-svh bg-[#10175f] lg:grid lg:place-items-center">
      <section className="landing-screen">
        <div className="hero-art" aria-hidden="true" />

        <section className="content-panel" aria-labelledby="hero-title">
          <img
            className="brand-mark"
            src="/images/LOGOCOPA.svg"
            alt="FIFA"
            width="84"
            height="84"
          />

          <div className="copy-wrap">
            <h1 id="hero-title">
              COMPLETE SEU ÁLBUM
              <br />
              SEM GASTAR UMA
              <br />
              FORTUNA EM PACOTINHOS
            </h1>

            <p>
              Receba todas as figurinhas em alta qualidade, prontas para
              imprimir e colar no álbum.
            </p>

            <a href="/acessar" className="cta-button">
              ACESSAR
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
