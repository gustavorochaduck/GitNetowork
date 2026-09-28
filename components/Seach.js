export function CreateSearchbar(containerSelector = "body") {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn(`CreateTopBar: container "${containerSelector}" não encontrado`);
        return;
    }

    const div = document.createElement('div');
    div.className = `
    flex self-center items-center w-[50%]
    m-auto
    px-4 py-3
    bg-black/15
    backdrop-blur-xl
    border border-white/20
    rounded-full shadow-lg
    transition-colors duration-300
  `.replace(/\s+/g, ' ').trim();
    div.innerHTML = `
  <div class="flex gap-x-10 h-fit w-full justify-center p-3">
    <form id="user-search-form" class="flex items-center w-full h-fit gap-x-3">
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Search User..."
        autocomplete="off"
        class="
          flex-1
          bg-transparent
          border-0 border-b-2 border-b-[#1e232c]
          focus:border-b-white/60 focus:outline-none focus:ring-0 transition-colors duration-700 ease-in-out
          appearance-none
          text-lg
          text-[#1e232c]
          placeholder:text-[#1e232c]/50 
          px-1 py-1
        "
      />
      <button type="submit" class="flex items-center gap-x-2 h-fit cursor-pointer">
        <span class="material-symbols-outlined text-[#1e232c] ">search</span>
        <p class="text-[#1e232c] text-xl font-semibold">Search</p>
      </button>
    </form>
  </div>
`;


    const form = div.querySelector('#user-search-form');
    const input = div.querySelector('#username');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = input.value.trim();
        if (!username) return;
        window.location.href = `./user.html?user=${encodeURIComponent(username)}`;
    });

    container.appendChild(div);
}