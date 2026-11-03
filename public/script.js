(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Jam WIB
  const tick = () => { $("#time").textContent = new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" }).replace(".", ":"); };
  tick(); setInterval(tick, 30000);

  // Bar terisi saat terlihat, bagian muncul saat digulir
  $$("section:not(.hero),.card,.panel").forEach(e => e.classList.add("rise"));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$(".bar i", e.target).forEach(b => b.style.width = b.dataset.w + "%");
    io.unobserve(e.target);
  }), { threshold: .2 });
  $$(".rise").forEach(e => io.observe(e));
  setTimeout(() => $$(".hero .bar i").forEach(b => b.style.width = b.dataset.w + "%"), 900);

  // Navigasi aktif
  const links = $$(".rail a:not(.logo)");
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.hash === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  // Garis rencana tergambar mengikuti gulir
  const road = $(".road");
  if (!calm) addEventListener("scroll", () => {
    const r = road.getBoundingClientRect();
    road.style.setProperty("--p", Math.min(1, Math.max(0, (innerHeight * .7 - r.top) / r.height)));
  }, { passive: true });

  // Paralaks halus pada hero
  const blob = $("#blob"), img = $(".blob-img");
  if (!calm) blob.addEventListener("pointermove", e => {
    const b = blob.getBoundingClientRect();
    img.style.transform = `translate(${((e.clientX - b.left) / b.width - .5) * -22}px,${((e.clientY - b.top) / b.height - .5) * -22}px)`;
  });

  // Penilaian
  let score = 0;
  const stars = $("#stars"), msg = $("#msg");
  for (let i = 1; i <= 5; i++) {
    const b = Object.assign(document.createElement("button"), { type: "button", textContent: "\u2605" });
    b.setAttribute("role", "radio"); b.setAttribute("aria-label", i + " bintang");
    b.onclick = () => { score = i; $$("button", stars).forEach((x, n) => x.classList.toggle("on", n < i)); };
    stars.append(b);
  }
  const summary = d => d.count ? `Rata-rata ${d.average.toFixed(1)} dari 5 dari ${d.count} penilaian.` : "Belum ada penilaian. Jadilah yang pertama.";
  fetch("/api/feedback").then(r => r.json()).then(d => msg.textContent = summary(d)).catch(() => {});
  $("#send").onclick = async () => {
    if (!score) { msg.textContent = "Pilih jumlah bintang dulu."; return; }
    try {
      const r = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating: score, comment: $("#comment").value.trim() }) });
      if (!r.ok) throw new Error(r.status);
      msg.textContent = "Terkirim. " + summary(await r.json());
      $("#comment").value = "";
    } catch { msg.textContent = "Belum terkirim. Fitur ini aktif setelah situs di-deploy ke Netlify."; }
  };
})();
