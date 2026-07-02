const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://chmdqxqdoyntldscwhcs.supabase.co",
  "YOUR_ANON_KEY"
);

async function run() {
  const result = await supabase.auth.signUp({
    email: "manualtest999@gmail.com",
    password: "Test123456",
  });

  console.log(JSON.stringify(result, null, 2));
}

run();
