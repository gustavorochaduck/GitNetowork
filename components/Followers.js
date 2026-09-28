import { CreateTopBar } from "./Topbar.js";
CreateTopBar();
const params = new URLSearchParams(window.location.search);
const userlogin = params.get('userlogin');
let followers = await GET_following(userlogin);
document.querySelector('title').textContent = `${userlogin} - followers`
followers.forEach(follower => {
  const panel = document.createElement('div');
  panel.className = `
    flex self-center items-center w-fit justify-evenly
    p-6
    gap-x-10
    bg-black/15
    backdrop-blur-xl
    border border-white/20
    rounded-xl shadow-lg
    text-[#1e232c]
  `;
  panel.innerHTML = `
    <div class="bg-[image:url('${follower.avatar_url}')] bg-cover bg-center h-64 w-64 rounded-xl"></div>
    <div class="flex flex-col h-full gap-y-10 justify-center text-xl font-semibold">
      <h1>Login:
        <a href="./user.html?user=${encodeURIComponent(follower.login)}">${follower.login}</a>
      </h1>
      <h1>View Type: ${follower.user_view_type}</h1>
    </div>
  `;
  document.querySelector('.followers').appendChild(panel);
});
async function GET_following() {
  const res = await fetch(`https://api.github.com/users/${userlogin}/followers`);
  if (res.status === 404) {
    document.getElementById('titulo').remove();
    const UserPanel = document.querySelector('.UserPanel');
    if (UserPanel) {
      const div = document.createElement('div');
      const PanelStyle = `
                flex self-center items-center w-fit justify-evenly
                p-6
                gap-x-10
                bg-black/15
                backdrop-blur-xl
                border border-white/20 
                rounded-xl shadow-lg
            `;
      div.className = PanelStyle;
      div.innerHTML = `
                <div class="bg-[image:url('./assets/img/run.gif')] bg-cover bg-center h-64 w-64 rounded-xl"></div>
                <h1 class="text-[#1e232c] font-bold text-xl">Request rate: 100%</h1>
            `;
      UserPanel.appendChild(div);
    }
    return null;
  }
  else if (res.status === 403) {
    document.getElementById('titulo').remove();
    const UserPanel = document.querySelector('.UserPanel');
    if (UserPanel) {
      const div = document.createElement('div');
      const PanelStyle = `
                flex self-center items-center w-fit justify-evenly
                p-6
                gap-x-10
                bg-black/15
                backdrop-blur-xl
                border border-white/20 
                rounded-xl shadow-lg
            `;
      div.className = PanelStyle;
      div.innerHTML = `
                <div class="bg-[image:url('./assets/img/run.gif')] bg-cover bg-center h-64 w-64 rounded-xl"></div>
                <h1 class="text-[#1e232c] font-bold text-xl">Request rate: 100%</h1>
            `;
      UserPanel.appendChild(div);
    }
    return null;
  }
  const dados = await res.json();
  return dados;
}
