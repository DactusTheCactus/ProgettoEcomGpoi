<script lang="ts">
    import { userStore } from './stores';
    import { initializeApp } from 'firebase/app';
    import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
    
    // Firebase configuration
   const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    export let show = true; // Control modal visibility from parent
    function closeModal() {
      show = false;
    }


    const API_URL = 'http://localhost:3001/api';
  
async function handleLogin() {
  if (loading) return;
  
  loading = true;
  error = '';
  
  try {
    const firebaseAuth = await signInWithEmailAndPassword(auth, email, password);
    const token = await firebaseAuth.user.getIdToken(); // Get Firebase ID token

    userStore.set({
      email: firebaseAuth.user.email ?? '',
      token: token, // Use Firebase token
      id: firebaseAuth.user.uid
    });

    closeModal();
  } catch (e) {
    error = e.message || 'Login failed. Please check your credentials.';
  } finally {
    loading = false;
  }
}

async function handleLogout() {
  try {
    await signOut(auth);
  } finally {
    userStore.set(null);
    closeModal();
  }
}
</script>

{#if show}
  <div class="modal-backdrop" on:click={closeModal}></div>
  <div class="modal">
    <button class="close-btn" on:click={closeModal} aria-label="Close">&times;</button>
    <div class="auth-container" on:click|stopPropagation>
      {#if $userStore}
        <div class="user-info">
          <p>Welcome, {$userStore.email}!</p>
          <button class="logout-btn" on:click={handleLogout}>Logout</button>
       </div>
      {:else}
        <form on:submit|preventDefault={handleLogin} class="login-form">
          <h2>Login</h2>
          <div class="form-group">
            <input 
              type="email" 
              bind:value={email} 
              placeholder="Email" 
              required 
              disabled={loading}
            />
          </div>
          <div class="form-group">
            <input 
              type="password" 
              bind:value={password} 
              placeholder="Password" 
              required 
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {#if error}
            <p class="error">{error}</p>
          {/if}
        </form>
      {/if}
    </div>
  </div>
{/if}


<style>
  .modal-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 1000;
  }
  .modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    min-width: 350px;
    max-width: 90vw;
  }
  .auth-container {
    max-width: 400px;
    margin: 0;
    padding: 2rem;
    background: #1a1a1a;
    border-radius: 8px;
    border: 1px solid #333;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 0.8rem;
    border: 1px solid #333;
    border-radius: 4px;
    background: #2a2a2a;
    color: #fff;
  }

  button {
    padding: 0.8rem;
    background: #ffd700;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .close-btn {
    position: absolute;
    top: 10px; right: 10px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1002;
  }
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error {
    color: #ff4444;
    margin-top: 0.5rem;
  }

  .user-info {
    text-align: center;
  }

  .logout-btn {
    background: #ff4444;
    color: white;
  }
</style>