type ActiveSecret = {
  current: string;
  previous?: string;
};

const active = new Map<string, ActiveSecret>();

export function activateSecret(
  name: string,
  newSecret: string
) {
  const current = active.get(name);

  active.set(name, {
    current: newSecret,
    previous: current?.current,
  });

  console.log(
    `✅ Zero-downtime rollover complete for ${name}`
  );
}
