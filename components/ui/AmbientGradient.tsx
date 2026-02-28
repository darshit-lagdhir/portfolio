"use client";

export default function AmbientGradient() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="ambient-blob ambient-blob-1" />
            <div className="ambient-blob ambient-blob-2" />
        </div>
    );
}
