"use client";

export default function PrintTicketButton({ label }: { label: string }) {
  return (
    <button className="ticket-print-button" onClick={() => window.print()} type="button">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M7 14h10v7H7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 12h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {label}
    </button>
  );
}
