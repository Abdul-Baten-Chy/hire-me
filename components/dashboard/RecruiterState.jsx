import { Card } from "@heroui/react";

export default function RecruiterState({ title, value, icon: Icon }) {
  return (
    <Card className="rounded-2xl border border-white/10 bg-[#11141b] p-2 text-zinc-100 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8)]">
      <Card.Header className="flex flex-col items-start gap-3 p-4">
        {/* Gravity UI Icon Wrapper */}
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-300">
          <Icon className="size-5" role="img" aria-label={`${title} icon`} />
        </div>

        {/* Title / Label */}
        <Card.Description className="text-xs font-medium text-zinc-400">
          {title}
        </Card.Description>
      </Card.Header>

      <Card.Footer className="px-4 pb-4 pt-0">
        {/* Stat Value */}
        <Card.Title className="text-2xl font-semibold tracking-tight text-white">
          {value}
        </Card.Title>
      </Card.Footer>
    </Card>
  );
}
