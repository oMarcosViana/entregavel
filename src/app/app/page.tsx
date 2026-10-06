import type { Metadata } from "next";
import Image from "next/image";
import { headers } from "next/headers";
import QRCode from "qrcode";
import PrintTicketButton from "./print-ticket-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meu ingresso | UEFA Champions League",
  description: "Acesse seu ingresso digital e os dados da sua compra.",
};

type TicketData = {
  code: string;
  ordinal: number;
  quantity: number;
  status: string;
  guest: { name: string; email: string };
  purchase: { total: number; currency: string };
  locale: string;
  match: {
    id: string;
    home: string;
    away: string;
    date: string;
    stadium: string;
    city: string;
    homeCrest: string;
    awayCrest: string;
    banner: string;
  };
};

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  codeLabel: string;
  codePlaceholder: string;
  openButton: string;
  confirmed: string;
  competition: string;
  date: string;
  buyer: string;
  email: string;
  purchased: string;
  ticket: string;
  of: string;
  section: string;
  seat: string;
  seatValue: string;
  gate: string;
  gateValue: string;
  individualCode: string;
  print: string;
  findTitle: string;
  findBody: string;
};

const copy: Record<string, Copy> = {
  en: { eyebrow: "YOUR MATCH ACCESS", title: "Your digital ticket", intro: "Your purchase details and individual match access.", codeLabel: "Ticket code", codePlaceholder: "Paste your individual code", openButton: "Open ticket", confirmed: "PAYMENT CONFIRMED", competition: "UEFA CHAMPIONS LEAGUE", date: "MATCH DATE", buyer: "TICKET HOLDER", email: "EMAIL", purchased: "PURCHASE", ticket: "TICKET", of: "OF", section: "SECTION", seat: "SEAT", seatValue: "To be assigned", gate: "GATE", gateValue: "Sent before match day", individualCode: "INDIVIDUAL TICKET CODE", print: "Print ticket", findTitle: "Access your ticket", findBody: "Open the individual link sent with your order or enter your ticket code below." },
  "pt-BR": { eyebrow: "SEU ACESSO AO JOGO", title: "Seu ingresso digital", intro: "Confira os dados da sua compra e o acesso individual à partida.", codeLabel: "Código do ingresso", codePlaceholder: "Cole seu código individual", openButton: "Acessar ingresso", confirmed: "PAGAMENTO CONFIRMADO", competition: "UEFA CHAMPIONS LEAGUE", date: "DATA DA PARTIDA", buyer: "TITULAR DO INGRESSO", email: "E-MAIL", purchased: "COMPRA", ticket: "INGRESSO", of: "DE", section: "SETOR", seat: "ASSENTO", seatValue: "A definir", gate: "PORTÃO", gateValue: "Informado antes da partida", individualCode: "CÓDIGO INDIVIDUAL DO INGRESSO", print: "Imprimir ingresso", findTitle: "Acesse seu ingresso", findBody: "Abra o link individual enviado com seu pedido ou informe abaixo o código do ingresso." },
  "pt-PT": { eyebrow: "O SEU ACESSO AO JOGO", title: "O seu bilhete digital", intro: "Consulte os dados da compra e o acesso individual ao jogo.", codeLabel: "Código do bilhete", codePlaceholder: "Introduza o seu código individual", openButton: "Aceder ao bilhete", confirmed: "PAGAMENTO CONFIRMADO", competition: "UEFA CHAMPIONS LEAGUE", date: "DATA DO JOGO", buyer: "TITULAR DO BILHETE", email: "E-MAIL", purchased: "COMPRA", ticket: "BILHETE", of: "DE", section: "SETOR", seat: "LUGAR", seatValue: "A definir", gate: "PORTA", gateValue: "Comunicada antes do jogo", individualCode: "CÓDIGO INDIVIDUAL DO BILHETE", print: "Imprimir bilhete", findTitle: "Aceda ao seu bilhete", findBody: "Abra o link individual enviado com a encomenda ou introduza abaixo o código do bilhete." },
  de: { eyebrow: "IHR SPIELZUGANG", title: "Ihr digitales Ticket", intro: "Hier finden Sie Ihre Kaufdetails und Ihren persönlichen Spielzugang.", codeLabel: "Ticketcode", codePlaceholder: "Persönlichen Code eingeben", openButton: "Ticket öffnen", confirmed: "ZAHLUNG BESTÄTIGT", competition: "UEFA CHAMPIONS LEAGUE", date: "SPIELDATUM", buyer: "TICKETINHABER", email: "E-MAIL", purchased: "KAUF", ticket: "TICKET", of: "VON", section: "BEREICH", seat: "PLATZ", seatValue: "Wird zugewiesen", gate: "EINGANG", gateValue: "Vor dem Spieltag mitgeteilt", individualCode: "PERSÖNLICHER TICKETCODE", print: "Ticket drucken", findTitle: "Öffnen Sie Ihr Ticket", findBody: "Öffnen Sie den persönlichen Link aus Ihrer Bestellung oder geben Sie Ihren Ticketcode ein." },
  es: { eyebrow: "TU ACCESO AL PARTIDO", title: "Tu entrada digital", intro: "Consulta los datos de tu compra y tu acceso individual al partido.", codeLabel: "Código de entrada", codePlaceholder: "Introduce tu código individual", openButton: "Abrir entrada", confirmed: "PAGO CONFIRMADO", competition: "UEFA CHAMPIONS LEAGUE", date: "FECHA DEL PARTIDO", buyer: "TITULAR DE LA ENTRADA", email: "CORREO ELECTRÓNICO", purchased: "COMPRA", ticket: "ENTRADA", of: "DE", section: "SECTOR", seat: "ASIENTO", seatValue: "Por asignar", gate: "PUERTA", gateValue: "Se comunicará antes del partido", individualCode: "CÓDIGO INDIVIDUAL DE ENTRADA", print: "Imprimir entrada", findTitle: "Accede a tu entrada", findBody: "Abre el enlace individual de tu pedido o introduce abajo el código de tu entrada." },
  fr: { eyebrow: "VOTRE ACCÈS AU MATCH", title: "Votre billet numérique", intro: "Retrouvez les détails de votre achat et votre accès individuel au match.", codeLabel: "Code du billet", codePlaceholder: "Saisissez votre code individuel", openButton: "Ouvrir le billet", confirmed: "PAIEMENT CONFIRMÉ", competition: "UEFA CHAMPIONS LEAGUE", date: "DATE DU MATCH", buyer: "TITULAIRE DU BILLET", email: "E-MAIL", purchased: "ACHAT", ticket: "BILLET", of: "SUR", section: "CATÉGORIE", seat: "PLACE", seatValue: "À attribuer", gate: "ENTRÉE", gateValue: "Communiquée avant le match", individualCode: "CODE INDIVIDUEL DU BILLET", print: "Imprimer le billet", findTitle: "Accédez à votre billet", findBody: "Ouvrez le lien individuel de votre commande ou saisissez le code de votre billet." },
};

function languageCopy(locale: string) {
  if (locale.toLowerCase().startsWith("pt-br")) return copy["pt-BR"];
  if (locale.toLowerCase().startsWith("pt")) return copy["pt-PT"];
  const language = locale.split("-")[0].toLowerCase();
  return copy[language] ?? copy.en;
}

function browserLocale(acceptLanguage: string | null) {
  const first = acceptLanguage?.split(",")[0]?.split(";")[0]?.trim();
  return first ? languageCopy(first) : copy.en;
}

function TicketCodeForm({ labels }: { labels: Copy }) {
  return (
    <main className="ticket-app ticket-app--lookup">
      <div className="ticket-app__grain" aria-hidden="true" />
      <header className="ticket-topbar ticket-topbar--center">
        <div className="ticket-brand" aria-label="UEFA Champions League">
          <Image src="/ticket/champions-league.svg" alt="UEFA Champions League" width={152} height={82} priority />
        </div>
      </header>
      <section className="ticket-lookup" aria-labelledby="ticket-heading">
        <p className="ticket-eyebrow">{labels.eyebrow}</p>
        <h1 id="ticket-heading">{labels.findTitle}</h1>
        <p className="ticket-intro__text">{labels.findBody}</p>
        <form action="/app" className="ticket-code-form">
          <label htmlFor="ticket-code">{labels.codeLabel}</label>
          <input id="ticket-code" name="codigo" autoComplete="off" placeholder={labels.codePlaceholder} required />
          <button type="submit">{labels.openButton}</button>
        </form>
      </section>
    </main>
  );
}

type Props = { searchParams: Promise<{ codigo?: string; code?: string }> };

export default async function TicketAppPage({ searchParams }: Props) {
  const { codigo, code } = await searchParams;
  const ticketCode = (codigo ?? code ?? "").trim();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(ticketCode)) {
    const requestHeaders = await headers();
    return <TicketCodeForm labels={browserLocale(requestHeaders.get("accept-language"))} />;
  }

  let ticket: TicketData | null = null;
  try {
    const response = await fetch(`https://uefa.ticketsoccer.shop/api/tickets/${encodeURIComponent(ticketCode)}`, { cache: "no-store" });
    if (response.ok) ticket = ((await response.json()) as { ticket: TicketData }).ticket;
  } catch {
    ticket = null;
  }
  if (!ticket) {
    const requestHeaders = await headers();
    return <TicketCodeForm labels={browserLocale(requestHeaders.get("accept-language"))} />;
  }

  const labels = languageCopy(ticket.locale);
  const [day, month, year] = ticket.match.date.split("/").map(Number);
  const matchDate = new Date(Date.UTC(year, month - 1, day, 12));
  const formattedDate = new Intl.DateTimeFormat(ticket.locale, {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  }).format(matchDate).toUpperCase();
  const weekday = new Intl.DateTimeFormat(ticket.locale, {
    weekday: "long", timeZone: "UTC",
  }).format(matchDate).toUpperCase();
  const formattedTotal = new Intl.NumberFormat(ticket.locale, {
    style: "currency", currency: ticket.purchase.currency,
  }).format(ticket.purchase.total);
  const ticketUrl = new URL(`/app?codigo=${encodeURIComponent(ticket.code)}`, "https://entregavel-nine.vercel.app").toString();
  const qrSvg = await QRCode.toString(ticketUrl, {
    type: "svg", errorCorrectionLevel: "M", margin: 1, width: 220,
    color: { dark: "#09152f", light: "#ffffff" },
  });

  return (
    <main className="ticket-app">
      <div className="ticket-app__grain" aria-hidden="true" />
      <header className="ticket-topbar ticket-topbar--center">
        <div className="ticket-brand" aria-label="UEFA Champions League">
          <Image src="/ticket/champions-league.svg" alt="UEFA Champions League" width={152} height={82} priority />
        </div>
      </header>

      <section className="ticket-intro" aria-labelledby="ticket-heading">
        <p className="ticket-eyebrow">{labels.eyebrow}</p>
        <h1 id="ticket-heading">{labels.title}</h1>
        <p className="ticket-intro__text">{labels.intro}</p>
      </section>

      <article className="match-ticket" aria-label={`${ticket.match.home} ${ticket.match.away}`}>
        <div className="match-ticket__visual" style={{ backgroundImage: `url('https://uefa.ticketsoccer.shop${ticket.match.banner}')` }}>
          <div className="match-ticket__shade" />
          <div className="match-ticket__visual-content">
            <div className="match-ticket__competition">
              <span>UEFA</span><span className="match-ticket__competition-line" /><span>{labels.competition}</span>
            </div>
            <div className="match-ticket__matchup">
              <div className="match-ticket__club">
                <span className="match-ticket__crest"><Image src={`https://uefa.ticketsoccer.shop${ticket.match.homeCrest}`} alt="" width={64} height={64} unoptimized /></span>
                <span>{ticket.match.home}</span>
              </div>
              <span className="match-ticket__versus">VS</span>
              <div className="match-ticket__club">
                <span className="match-ticket__crest"><Image src={`https://uefa.ticketsoccer.shop${ticket.match.awayCrest}`} alt="" width={64} height={64} unoptimized /></span>
                <span>{ticket.match.away}</span>
              </div>
            </div>
            <div className="match-ticket__venue">
              <span>{ticket.match.stadium}</span><span>{ticket.match.city}</span>
            </div>
          </div>
          <span className="match-ticket__lounge-tag">LOUNGE</span>
        </div>

        <div className="match-ticket__tear" aria-hidden="true"><span /><span /></div>

        <div className="match-ticket__details">
          <div className="match-ticket__main-info">
            <div className="match-ticket__date-block">
              <span className="match-ticket__detail-label">{labels.date}</span>
              <strong>{formattedDate}</strong><span>{weekday}</span>
            </div>
            <div className="match-ticket__guest-block">
              <span className="match-ticket__detail-label">{labels.buyer}</span>
              <strong>{ticket.guest.name}</strong>
              <span className="ticket-buyer-email"><b>{labels.email}:</b> {ticket.guest.email}</span>
            </div>
          </div>

          <div className="match-ticket__purchase-row">
            <span className="match-ticket__detail-label">{labels.purchased}</span>
            <span>{ticket.match.home} × {ticket.match.away} · {ticket.quantity} {labels.ticket.toLowerCase()}{ticket.quantity === 1 ? "" : "s"}</span>
            <strong>{formattedTotal}</strong>
          </div>

          <div className="match-ticket__perforation" aria-hidden="true"><span /><span /></div>

          <div className="match-ticket__stub">
            <div className="match-ticket__seat-info">
              <div><span className="match-ticket__detail-label">{labels.ticket}</span><strong>{ticket.ordinal} {labels.of} {ticket.quantity}</strong></div>
              <div><span className="match-ticket__detail-label">{labels.section}</span><strong>LOUNGE</strong></div>
              <div><span className="match-ticket__detail-label">{labels.seat}</span><strong>{labels.seatValue}</strong></div>
              <div><span className="match-ticket__detail-label">{labels.gate}</span><strong>{labels.gateValue}</strong></div>
            </div>
            <div className="match-ticket__qr" role="img" aria-label={`${labels.individualCode}: ${ticket.code}`} dangerouslySetInnerHTML={{ __html: qrSvg }} />
          </div>

          <div className="match-ticket__code-row">
            <span>{labels.individualCode}</span><strong>{ticket.code}</strong>
          </div>
        </div>
      </article>

      <div className="ticket-actions"><PrintTicketButton label={labels.print} /></div>
      <footer className="ticket-footer"><span>UEFA CHAMPIONS LEAGUE · MATCH ACCESS</span><span>{labels.confirmed}</span></footer>
    </main>
  );
}
