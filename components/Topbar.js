export function CreateTopBar(containerSelector = "#topbar") {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn(`CreateTopBar: container "${containerSelector}" Was not found!!!`);
        return;
    }

    const div = document.createElement('div');
    div.className = `
    flex self-center items-center w-[50%] justify-between
    px-4 py-3
    bg-black/15
    backdrop-blur-xl
    border border-white/20
    rounded-xl shadow-lg

  `.replace(/\s+/g, ' ').trim();
    div.innerHTML = `
    <div class="bg-[image:url('./assets/img/_.jpeg')] bg-cover bg-center h-16 w-16 rounded-xl"></div>
    <div class="flex gap-x-10">
      <a href="./index.html" class="flex items-center h-fit gap-x-2">
        <span class="material-symbols-outlined text-[#1e232c]">search</span>
        <p class="text-[#1e232c] text-xl font-semibold">Search</p>
      </a>
      <a href="./FirstUsers.html" class="flex items-center h-fit gap-x-2">
        <span class="material-symbols-outlined text-[#1e232c]">trophy</span>
        <p class="text-[#1e232c] text-xl font-semibold">First Users</p>
      </a>
    </div>
  `;

    container.appendChild(div);
}