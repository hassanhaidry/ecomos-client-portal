"use client";

export function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col gap-4"
      style={{ border: "1px solid #E0D8F8" }}
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl animate-pulse" style={{ background: "#E0D8F8" }} />
        <div className="w-16 h-6 rounded-full animate-pulse" style={{ background: "#E0D8F8" }} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-24 h-7 rounded-lg animate-pulse" style={{ background: "#E0D8F8" }} />
        <div className="w-32 h-4 rounded-lg animate-pulse" style={{ background: "#F3F4F6" }} />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <tr className="border-t" style={{ borderColor: "#F3F4F6" }}>
      {[120, 80, 60, 60, 80].map((w, i) => (
        <td key={i} className="px-6 py-4">
          <div
            className="h-4 rounded animate-pulse"
            style={{ background: "#E0D8F8", width: w }}
          />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonChart() {
  return (
    <div className="flex items-end gap-2 h-[220px] px-4">
      {[60, 80, 50, 90, 70, 85].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-lg animate-pulse"
          style={{ height: `${h}%`, background: "#E0D8F8" }}
        />
      ))}
    </div>
  );
}
