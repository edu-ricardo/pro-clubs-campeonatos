import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import axios from 'axios';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }
    .search-box {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    input {
      padding: 0.5rem;
      font-size: 1rem;
      flex: 1;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }
    .results, .stats {
      margin-top: 1rem;
    }
    .club-item {
      padding: 1rem;
      border: 1px solid #ccc;
      margin-bottom: 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .club-item:hover {
      background-color: #f9f9f9;
    }
    .stat-item {
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }
  `;

  @state()
  private clubName = '';

  @state()
  private searchResults: any[] = [];

  @state()
  private selectedClubStats: any[] = [];

  @state()
  private loading = false;

  private async handleSearch() {
    if (!this.clubName) return;
    
    this.loading = true;
    this.searchResults = [];
    this.selectedClubStats = [];
    
    try {
      const response = await axios.get(`http://localhost:3000/api/clubs/search?clubName=${this.clubName}`);
      // Usually API returns an object with a clubId key mapping to the club info, we need to extract it
      // if it's not an array. We will assume it might be an array or object.
      const data = response.data;
      if (typeof data === 'object' && !Array.isArray(data)) {
         this.searchResults = Object.values(data);
      } else if (Array.isArray(data)) {
         this.searchResults = data;
      }
    } catch (e) {
      console.error(e);
      alert('Error fetching clubs');
    } finally {
      this.loading = false;
    }
  }

  private async fetchStats(clubId: string) {
    this.loading = true;
    try {
      const response = await axios.get(`http://localhost:3000/api/clubs/${clubId}/members/stats`);
      const data = response.data;
      if (typeof data === 'object' && !Array.isArray(data)) {
        this.selectedClubStats = data.members ? data.members : Object.values(data);
      } else if (Array.isArray(data)) {
        this.selectedClubStats = data;
      }
    } catch (e) {
      console.error(e);
      alert('Error fetching stats');
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <h1>EAFC Pro Clubs - Buscar Clube</h1>
      <div class="search-box">
        <input 
          type="text" 
          .value=${this.clubName} 
          @input=${(e: any) => this.clubName = e.target.value}
          placeholder="Nome do clube..."
        />
        <button @click=${this.handleSearch} ?disabled=${this.loading}>Buscar</button>
      </div>
      
      ${this.loading ? html`<p>Carregando...</p>` : ''}
      
      ${this.searchResults.length > 0 && this.selectedClubStats.length === 0 ? html`
        <div class="results">
          <h2>Resultados da Busca</h2>
          ${this.searchResults.map((club: any) => html`
            <div class="club-item" @click=${() => this.fetchStats(club.clubId)}>
              <h3>${club.name} (ID: ${club.clubId})</h3>
              <p>Clique para ver as estatísticas dos jogadores</p>
            </div>
          `)}
        </div>
      ` : ''}
      
      ${this.selectedClubStats.length > 0 ? html`
        <div class="stats">
          <button @click=${() => this.selectedClubStats = []}>Voltar aos resultados</button>
          <h2>Estatísticas dos Jogadores</h2>
          ${this.selectedClubStats.map((stat: any) => html`
            <div class="stat-item">
              <strong>${stat.name}</strong> - Jogos: ${stat.gamesPlayed}, Gols: ${stat.goals}, Assistências: ${stat.assists}
            </div>
          `)}
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
