const API_BASE = 'http://localhost:3000';

async function handleFormSubmit(event: Event, url: string) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const data = Object.fromEntries(new FormData(form) as any);

  try {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error en la petición');
    console.log('Respuesta:', json);
    alert('Éxito');
  } catch (err: any) {
    alert(err.message);
  }
}

document.getElementById('registerForm')?.addEventListener('submit', e =>
  handleFormSubmit(e, '/auth/register')
);

document.getElementById('loginForm')?.addEventListener('submit', e =>
  handleFormSubmit(e, '/auth/login')
);