<script lang="ts">
    import { userStore } from './stores';
    
    let email = '';
    let password = '';
    let error = '';
    let loading = false;
    const API_URL = 'http://localhost:3001/api';
  
    async function handleLogin() {
      loading = true;
      error = '';
      
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        userStore.set({
          email: data.email,
          token: data.token,
          id: data.userId
        });

      } catch (e) {
        error = 'Login failed. Please check your credentials.';
      } finally {
        loading = false;
      }
    }

    async function handleLogout() {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${$userStore?.token}`
          }
        });
      } finally {
        userStore.set(null);
      }
    }
</script>

<div class="auth-container">
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

<style>
  .auth-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: #1a1a1a;
    border-radius: 8px;
    border: 1px solid #333;
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