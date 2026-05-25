"use client";

import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import {
  ArrowDownTrayIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

const albumPreviewUrl =
  "https://drive.google.com/file/d/1B6yTj_uuF2b9jNIU6V6oKctSPZVPAcIS/preview";

const streamVideoSrc =
  "https://customer-siyy2ilzb5oakkgv.cloudflarestream.com/db7f340ed60f7e82b73445a2a7f8d9c3/manifest/video.m3u8";

const goldPreviewUrls = [
  "https://drive.google.com/file/d/1UylIbKNSKKrqn734xM3KBEdjR8_ER2Hy/preview",
  "https://drive.google.com/file/d/1FsUQrL7OiSExa84Eeyj_1i4Iky8vfSxa/preview",
];

const holographicPreviewUrls = [
  "https://drive.google.com/file/d/1N2_0H5EihamTEaemd_rjqWqWlAp6aTAZ/preview",
];

const stationeryPreviewUrls = [
  "https://drive.google.com/file/d/1cf0KxkztArnDSk3zY3qG-J8qbbjDDQTs/preview",
  "https://drive.google.com/file/d/1-AiNRbR1NVGsJ3-WrY3oAhBmad1s91bf/preview",
  "https://drive.google.com/file/d/1v3hxvu06j4jIngT_Bly6PQCjdr4gg22v/preview",
  "https://drive.google.com/file/d/1TfnQpcN1dXd6fUkTCn95CGvcNj1_gsNk/preview",
];

const features = [
  {
    label: "ALTA QUALIDADE",
    icon: CheckBadgeIcon,
  },
  {
    label: "PRONTO PARA IMPRIMIR",
    icon: PrinterIcon,
  },
  {
    label: "INSTRUÇÕES COMPLETAS",
    icon: BookOpenIcon,
  },
  {
    label: "SUPORTE ESPECIALIZADO",
    icon: ChatBubbleLeftRightIcon,
  },
];

const carouselCards = [
  {
    title: "ÁLBUM COMPLETO",
    description: "Todas as seleções com mais de 980 figurinhas.",
    meta: "Pack principal • PDF HD",
    image: "/images/carrosel/ALBUM COMPLETO.webp",
    tone: "blue",
    previews: [albumPreviewUrl],
  },
  {
    eyebrow: "BÔNUS",
    title: "TODAS FIGURINHAS LEGENDS E DOURADAS",
    description: "",
    meta: "Extra • Coleção premium",
    image: "/images/carrosel/LEGENDS E GOLD.webp",
    tone: "gold",
    previews: goldPreviewUrls,
  },
  {
    eyebrow: "BÔNUS",
    title: "TODAS FIGURINHAS HOLOGRÁFICAS",
    description: "",
    meta: "Extra • Holográficas",
    image: "/images/carrosel/HOLOGRAFICO.webp",
    tone: "mint",
    previews: holographicPreviewUrls,
  },
  {
    title: "INSTRUÇÕES DE IMPRESSÃO + PAPELARIA",
    description: "",
    meta: "Manual • Passo a passo",
    image: "/images/carrosel/PAPELARIA.webp",
    tone: "paper",
    previews: stationeryPreviewUrls,
  },
];

const checklistItems = [
  "ARQUIVO EM PDF",
  "TODAS AS 980 FIGURAS",
  "TODOS OS JOGADORES",
  "TODAS AS SELEÇÕES",
  "ESCUDOS HOLOGRÁFICOS",
  "TODAS LEGENDS",
  "FIGURAS ESPECIAIS DA COCA COLA",
  "ARQUIVO DO PACOTINHO DA FIGURA",
  "FIGURAS ESPECIAIS DO MAC DONALDS",
  "ARQUIVO EXTRA DO NEYMAR",
  "FIGURAS NO TAMANHO IDEAL PARA IMPRESSÃO",
  "ALTA QUALIDADE DE IMAGEM",
  "PRONTO PARA IMPRESSÃO",
];

function StreamVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

  useEffect(() => {
    if (!videoRef.current || playerRef.current) {
      return;
    }

    playerRef.current = videojs(videoRef.current, {
      autoplay: false,
      controls: true,
      fluid: true,
      aspectRatio: "4:3",
      responsive: true,
      preload: "metadata",
      sources: [
        {
          src: streamVideoSrc,
          type: "application/x-mpegURL",
        },
      ],
    });

    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, []);

  return (
    <div data-vjs-player className="stream-video-player">
      <video ref={videoRef} className="video-js vjs-big-play-centered" playsInline />
    </div>
  );
}

export default function AccessPage() {
  const [activePreview, setActivePreview] = useState<{
    title: string;
    urls: string[];
  } | null>(null);
  const [lockedDownloadTitle, setLockedDownloadTitle] = useState<string | null>(null);

  return (
    <main
      className="access-page"
      style={{
        minHeight: "100svh",
        background:
          "radial-gradient(circle at 50% -120px, rgb(34 50 181 / 78%) 0 0, rgb(34 50 181 / 48%) 0 150px, transparent 330px), #0F164F",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <section
        className="access-shell"
        aria-labelledby="access-title"
        style={{
          width: "min(100%, 1420px)",
          minHeight: "100svh",
          padding: "clamp(28px, 4svh, 48px) clamp(20px, 6vw, 72px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          className="access-logo"
          src="/images/logocentralizada.svg"
          alt="Álbum 2026"
          width="202"
          height="98"
          style={{
            width: "clamp(142px, 17vw, 190px)",
            height: "auto",
            display: "block",
          }}
        />

        <div
          className="video-widget"
          aria-label="Vídeo de apresentação"
          style={{
            width: "100%",
            aspectRatio: "4 / 3",
            marginTop: "clamp(28px, 4svh, 44px)",
            borderRadius: "clamp(28px, 5vw, 60px)",
            background: "#02052A",
            boxShadow: "0 30px 70px rgb(0 0 0 / 18%)",
          }}
        >
          <StreamVideo />
        </div>

        <a className="purchase-button video-purchase-button" href="#adquirir">
          ADQUIRIR POR R$19,90
        </a>

        <div
          className="feature-strip"
          aria-label="Informações do produto"
          style={{
            width: "100%",
            marginTop: "24px",
            border: 0,
            borderRadius: 0,
            background: "transparent",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            overflow: "visible",
            boxShadow: "none",
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                className="feature-item"
                key={feature.label}
                style={{
                  minWidth: 0,
                  padding: "clamp(16px, 2.5vw, 22px) clamp(6px, 2vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "clamp(10px, 1.5vw, 16px)",
                  textAlign: "center",
                  borderRight: 0,
                }}
              >
                <span
                  className="feature-icon"
                  style={{
                    width: "clamp(50px, 8vw, 92px)",
                    aspectRatio: "1",
                    border: "2px solid rgb(16 220 192 / 82%)",
                    borderRadius: "20px",
                    color: "#39EAD8",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon aria-hidden="true" style={{ width: "56%" }} />
                </span>
                <strong
                  style={{
                    display: "flex",
                    width: "min(100%, 132px)",
                    minHeight: "46px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(255 255 255 / 94%)",
                    fontSize: "clamp(10px, 1.55vw, 17px)",
                    fontWeight: 800,
                    lineHeight: 1.22,
                    whiteSpace: "normal",
                    overflowWrap: "normal",
                    textWrap: "balance",
                  }}
                >
                  {feature.label}
                </strong>
              </div>
            );
          })}
        </div>

        <section className="carousel-section" aria-labelledby="carousel-title">
          <h2 id="carousel-title" className="materials-title">
            Acesse Todos os <span>Materiais</span>
          </h2>
          <div className="carousel-track" aria-label="Carrossel de materiais">
            {carouselCards.map((card) => (
              <article className={`preview-card preview-card-${card.tone}`} key={card.title}>
                <img src={card.image} alt="" width="520" height="887" loading="lazy" />
                <div className="preview-card-overlay">
                  <div className="preview-meta">{card.meta}</div>
                  {card.eyebrow ? <span className="preview-eyebrow">{card.eyebrow}</span> : null}
                  <h3>
                    {card.tone === "blue" ? (
                      <>
                        ÁLBUM <span>COMPLETO</span>
                      </>
                    ) : card.tone === "paper" ? (
                      <>
                        INSTRUÇÕES
                        <br />
                        DE IMPRESSÃO
                        <br />
                        <span>+ PAPELARIA</span>
                      </>
                    ) : card.tone === "gold" ? (
                      <>
                        <span>TODAS FIGURINHAS</span>
                        <br />
                        LEGENDS E DOURADAS
                      </>
                    ) : card.tone === "mint" ? (
                      <>
                        TODAS FIGURINHAS
                        <br />
                        <span>HOLOGRÁFICAS</span>
                      </>
                    ) : (
                      card.title
                    )}
                  </h3>
                  {card.description ? <p>{card.description}</p> : null}
                  <div className="preview-actions">
                    <button
                      type="button"
                      aria-label={`Ver prévia: ${card.title}`}
                      onClick={() => {
                        if (card.previews) {
                          setActivePreview({
                            title: card.title,
                            urls: card.previews,
                          });
                        }
                      }}
                    >
                      <EyeIcon aria-hidden="true" />
                      VER PRÉVIA
                    </button>
                    <button
                      type="button"
                      aria-label={`Baixar: ${card.title}`}
                      onClick={() => setLockedDownloadTitle(card.title)}
                    >
                      <ArrowDownTrayIcon aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="savings-banner" aria-labelledby="checklist-title">
          <img
            className="savings-mockup"
            src="/images/mockup.webp"
            alt=""
            width="560"
            height="560"
            aria-hidden="true"
          />
          <div className="savings-copy" id="checklist-title">
            <h2>ECONOMIZE MUITO MAIS!</h2>
            <p>Tudo que você recebe em um único pacote completo.</p>
          </div>
          <ul className="checklist-grid" aria-label="Itens inclusos">
            {checklistItems.map((item) => (
              <li key={item}>
                <CheckCircleIcon aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a className="purchase-button" href="#adquirir">
            ADQUIRIR POR R$19,90
          </a>
        </section>
      </section>

      {activePreview ? (
        <div
          className="preview-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
        >
          <button
            className="preview-modal-backdrop"
            type="button"
            aria-label="Fechar prévia"
            onClick={() => setActivePreview(null)}
          />
          <div className="preview-modal-card">
            <div className="preview-modal-header">
              <h2 id="preview-modal-title">Prévia: {activePreview.title}</h2>
              <button
                className="preview-modal-close"
                type="button"
                aria-label="Fechar prévia"
                onClick={() => setActivePreview(null)}
              >
                <XMarkIcon aria-hidden="true" />
              </button>
            </div>
            <div className="preview-frame-grid">
              {activePreview.urls.map((url, index) => (
                <iframe
                  className="preview-frame"
                  key={url}
                  src={url}
                  title={`Prévia ${index + 1}: ${activePreview.title}`}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {lockedDownloadTitle ? (
        <div
          className="preview-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
        >
          <button
            className="preview-modal-backdrop"
            type="button"
            aria-label="Fechar aviso"
            onClick={() => setLockedDownloadTitle(null)}
          />
          <div className="locked-download-card">
            <button
              className="preview-modal-close locked-download-close"
              type="button"
              aria-label="Fechar aviso"
              onClick={() => setLockedDownloadTitle(null)}
            >
              <XMarkIcon aria-hidden="true" />
            </button>
            <div className="locked-download-icon">
              <ArrowDownTrayIcon aria-hidden="true" />
            </div>
            <h2 id="download-modal-title">Download liberado após pagamento</h2>
            <p>
              A prévia está disponível agora. O arquivo completo de{" "}
              <strong>{lockedDownloadTitle}</strong> será desbloqueado assim que
              a compra for confirmada.
            </p>
            <a className="purchase-button" href="#adquirir" onClick={() => setLockedDownloadTitle(null)}>
              ADQUIRIR POR R$19,90
            </a>
          </div>
        </div>
      ) : null}
    </main>
  );
}
