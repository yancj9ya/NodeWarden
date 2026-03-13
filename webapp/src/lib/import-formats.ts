import type { CiphersImportPayload } from '@/lib/api';

type ImportSourceEntry = { id: string; label: string };

export const IMPORT_SOURCES = [
  { id: 'bitwarden_json', label: 'Bitwarden (json)' },
  { id: 'bitwarden_csv', label: 'Bitwarden (csv)' },
  { id: 'bitwarden_zip', label: 'Bitwarden (zip)' },
  { id: 'nodewarden_json', label: 'NodeWarden (json)' },
  { id: 'onepassword_1pux', label: '1Password (1pux/json)' },
  { id: 'onepassword_1pif', label: '1Password (1pif)' },
  { id: 'onepassword_mac_csv', label: '1Password 6 and 7 Mac (csv)' },
  { id: 'onepassword_win_csv', label: '1Password 6 and 7 Windows (csv)' },
  { id: 'protonpass_json', label: 'ProtonPass (json/zip)' },
  { id: 'avira_csv', label: 'Avira (csv)' },
  { id: 'avast_csv', label: 'Avast Passwords (csv)' },
  { id: 'avast_json', label: 'Avast Passwords (json)' },
  { id: 'chrome', label: 'Chrome' },
  { id: 'edge', label: 'Edge' },
  { id: 'brave', label: 'Brave' },
  { id: 'opera', label: 'Opera' },
  { id: 'vivaldi', label: 'Vivaldi' },
  { id: 'firefox_csv', label: 'Firefox (csv)' },
  { id: 'safari_csv', label: 'Safari and macOS (csv)' },
  { id: 'lastpass', label: 'LastPass (csv)' },
  { id: 'dashlane_csv', label: 'Dashlane (csv)' },
  { id: 'dashlane_json', label: 'Dashlane (json)' },
  { id: 'keepass_xml', label: 'KeePass 2 (xml)' },
  { id: 'keepassx_csv', label: 'KeePassX (csv)' },
  { id: 'arc_csv', label: 'Arc (csv)' },
  { id: 'ascendo_csv', label: 'Ascendo DataVault (csv)' },
  { id: 'blackberry_csv', label: 'BlackBerry Password Keeper (csv)' },
  { id: 'blur_csv', label: 'Blur (csv)' },
  { id: 'buttercup_csv', label: 'Buttercup (csv)' },
  { id: 'codebook_csv', label: 'Codebook (csv)' },
  { id: 'encryptr_csv', label: 'Encryptr (csv)' },
  { id: 'enpass_csv', label: 'Enpass (csv)' },
  { id: 'enpass_json', label: 'Enpass (json)' },
  { id: 'keeper_csv', label: 'Keeper (csv)' },
  { id: 'keeper_json', label: 'Keeper (json)' },
  { id: 'logmeonce_csv', label: 'LogMeOnce (csv)' },
  { id: 'meldium_csv', label: 'Meldium (csv)' },
  { id: 'msecure_csv', label: 'mSecure (csv)' },
  { id: 'myki_csv', label: 'Myki (csv)' },
  { id: 'netwrix_csv', label: 'Netwrix Password Secure (csv)' },
  { id: 'nordpass_csv', label: 'NordPass (csv)' },
  { id: 'roboform_csv', label: 'RoboForm (csv)' },
  { id: 'zohovault_csv', label: 'Zoho Vault (csv)' },
  { id: 'passman_json', label: 'Passman (json)' },
  { id: 'passky_json', label: 'Passky (json)' },
  { id: 'psono_json', label: 'Psono (json)' },
  { id: 'passwordboss_json', label: 'Password Boss (json)' },
 ] as const satisfies readonly ImportSourceEntry[];

export type ImportSourceId = (typeof IMPORT_SOURCES)[number]['id'];

export function getFileAcceptBySource(source: ImportSourceId): string {
  if (source === 'bitwarden_zip') return '.zip,application/zip,application/x-zip-compressed';
  if (
    source === 'bitwarden_json' ||
    source === 'nodewarden_json' ||
    source === 'onepassword_1pux' ||
    source === 'protonpass_json' ||
    source === 'avast_json' ||
    source === 'dashlane_json' ||
    source === 'enpass_json' ||
    source === 'keeper_json' ||
    source === 'passman_json' ||
    source === 'passky_json' ||
    source === 'psono_json' ||
    source === 'passwordboss_json'
  ) {
    if (source === 'onepassword_1pux') return '.1pux,.zip,.json,application/zip,application/json';
    if (source === 'protonpass_json') return '.zip,.json,application/zip,application/json';
    return '.json,application/json';
  }
  if (source === 'onepassword_1pif') return '.1pif,.txt,.json,text/plain,application/json';
  if (source === 'keepass_xml') return '.xml,text/xml,application/xml';
  return '.csv,text/csv';
}

export interface BitwardenFolderInput {
  id?: string | null;
  name?: string | null;
}
export interface BitwardenUriInput {
  uri?: string | null;
  match?: number | null;
}
export interface BitwardenFieldInput {
  name?: string | null;
  value?: string | null;
  type?: number | null;
  linkedId?: number | null;
}
export interface BitwardenCipherInput {
  id?: string | null;
  type?: number | null;
  name?: string | null;
  notes?: string | null;
  favorite?: boolean | null;
  reprompt?: number | null;
  key?: string | null;
  folderId?: string | null;
  login?: {
    uris?: BitwardenUriInput[] | null;
    username?: string | null;
    password?: string | null;
    totp?: string | null;
    fido2Credentials?: Array<Record<string, unknown>> | null;
  } | null;
  card?: Record<string, unknown> | null;
  identity?: Record<string, unknown> | null;
  secureNote?: { type?: number | null } | null;
  fields?: BitwardenFieldInput[] | null;
  passwordHistory?: Array<{ password?: string | null; lastUsedDate?: string | null }> | null;
  sshKey?: Record<string, unknown> | null;
}
export interface BitwardenJsonInput {
  encrypted?: boolean;
  passwordProtected?: boolean;
  encKeyValidation_DO_NOT_EDIT?: string;
  collections?: Array<{ id?: string | null; name?: string | null }> | null;
  folders?: BitwardenFolderInput[] | null;
  items?: BitwardenCipherInput[] | null;
}

type CsvRow = Record<string, string>;

function txt(v: unknown): string {
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

function val(v: unknown, fallback: string | null = null): string | null {
  const s = txt(v);
  return s ? s : fallback;
}

function normalizeUri(raw: string): string | null {
  const s = txt(raw);
  if (!s) return null;
  if (!s.includes('://') && s.includes('.')) return (`http://${s}`).slice(0, 1000);
  return s.slice(0, 1000);
}

function nameFromUrl(raw: string): string | null {
  const uri = normalizeUri(raw);
  if (!uri) return null;
  try {
    const host = new URL(uri).hostname || '';
    if (!host) return null;
    return host.startsWith('www.') ? host.slice(4) : host;
  } catch {
    return null;
  }
}

function convertToNoteIfNeeded(cipher: Record<string, unknown>): void {
  if (Number(cipher.type || 1) !== 1) return;
  const login = cipher.login as Record<string, unknown> | null;
  const hasLoginData =
    !!txt(login?.username) ||
    !!txt(login?.password) ||
    !!txt(login?.totp) ||
    (Array.isArray(login?.uris) && login!.uris.length > 0);
  if (hasLoginData) return;
  cipher.type = 2;
  cipher.login = null;
  cipher.secureNote = { type: 0 };
}

function splitFullName(fullName: string | null): { firstName: string | null; middleName: string | null; lastName: string | null } {
  const parts = txt(fullName).split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || null,
    middleName: parts.length > 2 ? parts.slice(1, -1).join(' ') : null,
    lastName: parts.length > 1 ? parts[parts.length - 1] : null,
  };
}

function parseEpochMaybe(epoch: unknown): string | null {
  const n = Number(epoch);
  if (!Number.isFinite(n) || n <= 0) return null;
  const ms = n >= 1_000_000_000_000 ? n : n * 1000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function parseCardExpiry(raw: string): { month: string | null; year: string | null } {
  const s = txt(raw);
  if (!s) return { month: null, year: null };
  const yyyymm = s.match(/^(\d{4})(\d{2})$/);
  if (yyyymm) return { month: String(Number(yyyymm[2])), year: yyyymm[1] };
  const mmYYYY = s.match(/^(\d{1,2})\/(\d{4})$/);
  if (mmYYYY) return { month: String(Number(mmYYYY[1])), year: mmYYYY[2] };
  const mmYY = s.match(/^(\d{1,2})\/(\d{2})$/);
  if (mmYY) return { month: String(Number(mmYY[1])), year: `20${mmYY[2]}` };
  const dashed = s.match(/^(\d{4})-(\d{2})/);
  if (dashed) return { month: String(Number(dashed[2])), year: dashed[1] };
  return { month: null, year: null };
}

function onePasswordTypeHints(typeName: string): 1 | 2 | 3 | 4 {
  const t = txt(typeName).toLowerCase();
  if (t.includes('creditcard') || t.includes('credit card')) return 3;
  if (t.includes('identity')) return 4;
  if (t.includes('securenote') || t.includes('secure note')) return 2;
  return 1;
}

function onePasswordCategoryType(categoryUuid: string): 1 | 2 | 3 | 4 {
  const c = txt(categoryUuid);
  if (['002', '101'].includes(c)) return 3;
  if (['004', '103', '104', '105', '106', '107', '108'].includes(c)) return 4;
  if (['003', '100', '113'].includes(c)) return 2;
  return 1;
}

function parseCsv(raw: string): CsvRow[] {
  const rows: string[][] = [];
  let cell = '';
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (inQuotes) {
      if (ch === '"') {
        if (raw[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQuotes = false;
      } else cell += ch;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      continue;
    }
    if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }
    if (ch === '\r') continue;
    cell += ch;
  }
  row.push(cell);
  rows.push(row);
  const nonEmpty = rows.filter((r) => r.some((c) => txt(c)));
  if (!nonEmpty.length) return [];
  const headers = nonEmpty[0].map((h) => txt(h));
  const out: CsvRow[] = [];
  for (let i = 1; i < nonEmpty.length; i++) {
    const values = nonEmpty[i];
    const obj: CsvRow = {};
    for (let c = 0; c < headers.length; c++) {
      if (headers[c]) obj[headers[c]] = values[c] ?? '';
    }
    out.push(obj);
  }
  return out;
}

function parseCsvRows(raw: string): string[][] {
  const rows: string[][] = [];
  let cell = '';
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (inQuotes) {
      if (ch === '"') {
        if (raw[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQuotes = false;
      } else cell += ch;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      continue;
    }
    if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }
    if (ch === '\r') continue;
    cell += ch;
  }
  row.push(cell);
  rows.push(row);
  return rows.filter((r) => r.some((c) => txt(c)));
}

function processKvp(cipher: Record<string, unknown>, key: string, value: string, hidden = false): void {
  const k = txt(key);
  const v = txt(value);
  if (!v) return;
  const fields = Array.isArray(cipher.fields) ? (cipher.fields as Array<Record<string, unknown>>) : [];
  if (v.length > 200 || /\r\n|\r|\n/.test(v)) {
    const existing = txt(cipher.notes);
    cipher.notes = `${existing}${existing ? '\n' : ''}${k ? `${k}: ` : ''}${v}`;
    return;
  }
  fields.push({ type: hidden ? 1 : 0, name: k, value: v, linkedId: null });
  cipher.fields = fields;
}

function makeLoginCipher(): Record<string, unknown> {
  return {
    type: 1,
    name: '--',
    notes: null,
    favorite: false,
    reprompt: 0,
    key: null,
    login: { username: null, password: null, totp: null, fido2Credentials: null, uris: null },
    card: null,
    identity: null,
    secureNote: null,
    fields: [],
    passwordHistory: null,
    sshKey: null,
  };
}

function addFolder(result: CiphersImportPayload, folderName: string, cipherIndex: number): void {
  const name = txt(folderName).replace(/\\/g, '/');
  if (!name || name === '(none)') return;
  let i = result.folders.findIndex((f) => f.name === name);
  if (i < 0) {
    i = result.folders.length;
    result.folders.push({ name });
  }
  result.folderRelationships.push({ key: cipherIndex, value: i });
}

function parseChromeCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    const m = txt(row.url).match(/^android:\/\/.*@([^/]+)\//);
    const uri = m ? `androidapp://${m[1]}` : normalizeUri(row.url || '');
    cipher.name = val(row.name, m?.[1] || '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.username);
    login.password = val(row.password);
    login.uris = uri ? [{ uri, match: null }] : null;
    cipher.notes = val(row.note);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseFirefoxCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw).filter((r) => txt(r.url) !== 'chrome://FirefoxAccounts');
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    const raw = val(row.url, val(row.hostname, '') || '') || '';
    let name: string | null = null;
    try {
      const host = new URL(normalizeUri(raw) || '').hostname || '';
      name = host.startsWith('www.') ? host.slice(4) : host || null;
    } catch {}
    cipher.name = val(name, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.username);
    login.password = val(row.password);
    const uri = normalizeUri(raw);
    login.uris = uri ? [{ uri, match: null }] : null;
    result.ciphers.push(cipher);
  }
  return result;
}

function parseSafariCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(row.Title, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.Username);
    login.password = val(row.Password);
    const uri = normalizeUri(row.Url || row.URL || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    login.totp = val(row.OTPAuth);
    cipher.notes = val(row.Notes);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseBitwardenCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const type = txt(row.type).toLowerCase() || 'login';
    if (type === 'note') {
      const idx = result.ciphers.push({
        type: 2,
        name: val(row.name, '--'),
        notes: val(row.notes),
        favorite: txt(row.favorite) === '1',
        reprompt: 0,
        key: null,
        login: null,
        card: null,
        identity: null,
        secureNote: { type: 0 },
        fields: null,
        passwordHistory: null,
        sshKey: null,
      }) - 1;
      addFolder(result, row.folder, idx);
      continue;
    }
    const cipher = makeLoginCipher();
    cipher.name = val(row.name, '--');
    cipher.notes = val(row.notes);
    cipher.favorite = txt(row.favorite) === '1';
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.login_username);
    login.password = val(row.login_password);
    login.totp = val(row.login_totp);
    const uri = normalizeUri(row.login_uri || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, row.folder, idx);
  }
  return result;
}

function parseAviraCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(row.name, val(nameFromUrl(row.website), '--'));
    const login = cipher.login as Record<string, unknown>;
    login.uris = normalizeUri(row.website || '') ? [{ uri: normalizeUri(row.website || ''), match: null }] : null;
    login.password = val(row.password);
    if (!txt(row.username) && txt(row.secondary_username)) {
      login.username = val(row.secondary_username);
    } else {
      login.username = val(row.username);
      cipher.notes = val(row.secondary_username);
    }
    result.ciphers.push(cipher);
  }
  return result;
}

function parseAvastCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(row.name, '--');
    const login = cipher.login as Record<string, unknown>;
    login.uris = normalizeUri(row.web || '') ? [{ uri: normalizeUri(row.web || ''), match: null }] : null;
    login.password = val(row.password);
    login.username = val(row.login);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseAvastJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as { logins?: any[]; notes?: any[]; cards?: any[] };
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const value of parsed.logins || []) {
    const cipher = makeLoginCipher();
    cipher.name = val(value?.custName, '--');
    cipher.notes = val(value?.note);
    const login = cipher.login as Record<string, unknown>;
    const uri = normalizeUri(value?.url || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    login.password = val(value?.pwd);
    login.username = val(value?.loginName);
    result.ciphers.push(cipher);
  }
  for (const value of parsed.notes || []) {
    result.ciphers.push({
      type: 2,
      name: val(value?.label, '--'),
      notes: val(value?.text),
      favorite: false,
      reprompt: 0,
      key: null,
      login: null,
      card: null,
      identity: null,
      secureNote: { type: 0 },
      fields: null,
      passwordHistory: null,
      sshKey: null,
    });
  }
  for (const value of parsed.cards || []) {
    result.ciphers.push({
      type: 3,
      name: val(value?.custName, '--'),
      notes: val(value?.note),
      favorite: false,
      reprompt: 0,
      key: null,
      login: null,
      card: {
        cardholderName: val(value?.holderName),
        number: val(value?.cardNumber),
        code: val(value?.cvv),
        brand: cardBrand(val(value?.cardNumber)),
        expMonth: val(value?.expirationDate?.month),
        expYear: val(value?.expirationDate?.year),
      },
      identity: null,
      secureNote: null,
      fields: null,
      passwordHistory: null,
      sshKey: null,
    });
  }
  return result;
}

function parseArcCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(nameFromUrl(row.url), '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.username);
    login.password = val(row.password);
    const uri = normalizeUri(row.url || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    cipher.notes = val(row.note);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseAscendoCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsvRows(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    if (row.length < 2) continue;
    const cipher = makeLoginCipher();
    cipher.name = val(row[0], '--');
    cipher.notes = val(row[row.length - 1]);
    if (row.length > 2 && row.length % 2 === 0) {
      for (let i = 0; i < row.length - 2; i += 2) {
        const field = txt(row[i + 1]);
        const fieldValue = txt(row[i + 2]);
        if (!field || !fieldValue) continue;
        const low = field.toLowerCase();
        const login = cipher.login as Record<string, unknown>;
        if (!txt(login.password) && ['password', 'pass', 'passwd'].includes(low)) login.password = fieldValue;
        else if (!txt(login.username) && ['username', 'user', 'email', 'login', 'id'].includes(low)) login.username = fieldValue;
        else if ((!Array.isArray(login.uris) || !login.uris.length) && ['url', 'uri', 'website', 'web site', 'host', 'hostname'].includes(low)) {
          const uri = normalizeUri(fieldValue);
          login.uris = uri ? [{ uri, match: null }] : null;
        } else processKvp(cipher, field, fieldValue, false);
      }
    }
    convertToNoteIfNeeded(cipher);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseBlackberryCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    if (txt(row.grouping) === 'list') continue;
    const cipher = makeLoginCipher();
    cipher.favorite = txt(row.fav) === '1';
    cipher.name = val(row.name, '--');
    cipher.notes = val(row.extra);
    if (txt(row.grouping) !== 'note') {
      const login = cipher.login as Record<string, unknown>;
      const uri = normalizeUri(row.url || '');
      login.uris = uri ? [{ uri, match: null }] : null;
      login.password = val(row.password);
      login.username = val(row.username);
    }
    convertToNoteIfNeeded(cipher);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseBlurCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const label = txt(row.label) === 'null' ? '' : txt(row.label);
    const cipher = makeLoginCipher();
    cipher.name = val(label, val(nameFromUrl(row.domain), '--'));
    const login = cipher.login as Record<string, unknown>;
    const uri = normalizeUri(row.domain || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    login.password = val(row.password);
    if (!txt(row.email) && txt(row.username)) login.username = val(row.username);
    else {
      login.username = val(row.email);
      cipher.notes = val(row.username);
    }
    result.ciphers.push(cipher);
  }
  return result;
}

function parseButtercupCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const official = new Set(['!group_id', '!group_name', '!type', 'title', 'username', 'password', 'url', 'note', 'id']);
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(row.title, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.username);
    login.password = val(row.password);
    const uri = normalizeUri(row.URL || row.url || row.Url || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    cipher.notes = val(row.note || row.Note || row.notes || row.Notes);

    for (const key of Object.keys(row)) {
      if (official.has(key.toLowerCase())) continue;
      processKvp(cipher, key, row[key], false);
    }
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, row['!group_name'], idx);
  }
  return result;
}

function parseCodebookCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.favorite = txt(row.Favorite).toLowerCase() === 'true';
    cipher.name = val(row.Entry, '--');
    cipher.notes = val(row.Note);
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.Username, val(row.Email));
    login.password = val(row.Password);
    login.totp = val(row.TOTP);
    const uri = normalizeUri(row.Website || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    if (txt(row.Username)) processKvp(cipher, 'Email', row.Email || '', false);
    processKvp(cipher, 'Phone', row.Phone || '', false);
    processKvp(cipher, 'PIN', row.PIN || '', false);
    processKvp(cipher, 'Account', row.Account || '', false);
    processKvp(cipher, 'Date', row.Date || '', false);
    convertToNoteIfNeeded(cipher);
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, row.Category, idx);
  }
  return result;
}

function parseEncryptrCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(row.Label, '--');
    cipher.notes = val(row.Notes);
    const text = val(row.Text);
    if (text) cipher.notes = txt(cipher.notes) ? `${txt(cipher.notes)}\n\n${text}` : text;
    const type = txt(row['Entry Type']);
    if (type === 'Password') {
      const login = cipher.login as Record<string, unknown>;
      login.username = val(row.Username);
      login.password = val(row.Password);
      const uri = normalizeUri(row['Site URL'] || '');
      login.uris = uri ? [{ uri, match: null }] : null;
    } else if (type === 'Credit Card') {
      const expiry = txt(row.Expiry);
      let expMonth: string | null = null;
      let expYear: string | null = null;
      const parts = expiry.split('/');
      if (parts.length > 1) {
        expMonth = txt(parts[0]);
        const y = txt(parts[1]);
        expYear = y.length === 2 ? `20${y}` : y || null;
      }
      cipher.type = 3;
      cipher.login = null;
      cipher.card = {
        cardholderName: val(row['Name on card']),
        number: val(row['Card Number']),
        brand: cardBrand(val(row['Card Number'])),
        code: val(row.CVV),
        expMonth,
        expYear,
      };
    }
    convertToNoteIfNeeded(cipher);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseKeePassXCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    if (!txt(row.Title)) continue;
    const cipher = makeLoginCipher();
    cipher.notes = val(row.Notes);
    cipher.name = val(row.Title, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.Username);
    login.password = val(row.Password);
    login.totp = val(row.TOTP);
    const uri = normalizeUri(row.URL || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, txt(row.Group).replace(/^Root\//, ''), idx);
  }
  return result;
}

function parseLastPassCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const isSecureNote = txt(row.url) === 'http://sn';
    if (isSecureNote) {
      const idx = result.ciphers.push({
        type: 2,
        name: val(row.name, '--'),
        notes: val(row.extra),
        favorite: txt(row.fav) === '1',
        reprompt: 0,
        key: null,
        login: null,
        card: null,
        identity: null,
        secureNote: { type: 0 },
        fields: null,
        passwordHistory: null,
        sshKey: null,
      }) - 1;
      addFolder(result, txt(row.grouping).replace(/[\x00-\x1F\x7F-\x9F]/g, ''), idx);
      continue;
    }
    const cipher = makeLoginCipher();
    cipher.name = val(row.name, '--');
    cipher.favorite = txt(row.fav) === '1';
    cipher.notes = val(row.extra);
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.username);
    login.password = val(row.password);
    login.totp = val(row.totp);
    const uri = normalizeUri(row.url || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, txt(row.grouping).replace(/[\x00-\x1F\x7F-\x9F]/g, ''), idx);
  }
  return result;
}

function parseDashlaneCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const keys = Object.keys(row);
    if (keys[0] === 'username') {
      const cipher = makeLoginCipher();
      cipher.name = val(row.title, '--');
      const login = cipher.login as Record<string, unknown>;
      login.username = val(row.username);
      login.password = val(row.password);
      login.totp = val(row.otpUrl || row.otpSecret);
      const uri = normalizeUri(row.url || '');
      login.uris = uri ? [{ uri, match: null }] : null;
      cipher.notes = val(row.note);
      const idx = result.ciphers.push(cipher) - 1;
      addFolder(result, row.category, idx);
      continue;
    }
    if (keys[0] === 'title' && keys[1] === 'note') {
      result.ciphers.push({
        type: 2,
        name: val(row.title, '--'),
        notes: val(row.note),
        favorite: false,
        reprompt: 0,
        key: null,
        login: null,
        card: null,
        identity: null,
        secureNote: { type: 0 },
        fields: null,
        passwordHistory: null,
        sshKey: null,
      });
    }
  }
  return result;
}

function parseDashlaneJson(textRaw: string): CiphersImportPayload {
  const data = JSON.parse(textRaw) as Record<string, unknown>;
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const auth = data.AUTHENTIFIANT;
  if (Array.isArray(auth)) {
    for (const item of auth) {
      if (!item || typeof item !== 'object') continue;
      const row = item as Record<string, unknown>;
      const cipher = makeLoginCipher();
      cipher.name = val(row.title, '--');
      const login = cipher.login as Record<string, unknown>;
      login.username = val(row.login, val(row.secondaryLogin, val(row.email)));
      login.password = val(row.password);
      const uri = normalizeUri(String(row.domain ?? ''));
      login.uris = uri ? [{ uri, match: null }] : null;
      cipher.notes = val(row.note);
      result.ciphers.push(cipher);
    }
  }
  return result;
}

function parseKeePassXml(textRaw: string): CiphersImportPayload {
  const doc = new DOMParser().parseFromString(textRaw, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Invalid XML file');
  const rootGroup = doc.querySelector('KeePassFile > Root > Group');
  if (!rootGroup) throw new Error('Invalid KeePass XML structure');
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };

  function qd(parent: Element, selector: string): Element[] {
    return Array.from(parent.querySelectorAll(selector)).filter((x) => x.parentNode === parent);
  }

  function ensureFolder(path: string): number {
    let i = result.folders.findIndex((f) => f.name === path);
    if (i < 0) {
      i = result.folders.length;
      result.folders.push({ name: path });
    }
    return i;
  }

  function walk(group: Element, isRoot: boolean, prefix: string): void {
    let current = prefix;
    let folder = -1;
    if (!isRoot) {
      const name = txt(qd(group, 'Name')[0]?.textContent) || '-';
      current = current ? `${current}/${name}` : name;
      folder = ensureFolder(current);
    }
    for (const entry of qd(group, 'Entry')) {
      const cipher = makeLoginCipher();
      for (const s of qd(entry, 'String')) {
        const key = txt(qd(s, 'Key')[0]?.textContent);
        const value = txt(qd(s, 'Value')[0]?.textContent);
        if (!value) continue;
        const login = cipher.login as Record<string, unknown>;
        if (key === 'Title') cipher.name = value;
        else if (key === 'UserName') login.username = value;
        else if (key === 'Password') login.password = value;
        else if (key === 'URL') {
          const uri = normalizeUri(value);
          login.uris = uri ? [{ uri, match: null }] : null;
        } else if (key === 'otp') login.totp = value.replace('key=', '');
        else if (key === 'Notes') cipher.notes = `${txt(cipher.notes)}${txt(cipher.notes) ? '\n' : ''}${value}`;
      }
      const idx = result.ciphers.push(cipher) - 1;
      if (!isRoot && folder >= 0) result.folderRelationships.push({ key: idx, value: folder });
    }
    for (const child of qd(group, 'Group')) walk(child, false, current);
  }

  walk(rootGroup, true, '');
  return result;
}

function cardBrand(number: string | null): string | null {
  const n = txt(number).replace(/\s+/g, '');
  if (!n) return null;
  if (/^4/.test(n)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'Amex';
  if (/^6(?:011|5)/.test(n)) return 'Discover';
  return null;
}

function parseEnpassCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsvRows(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  let first = true;
  for (const r of rows) {
    if (r.length < 2 || (first && (r[0] === 'Title' || r[0] === 'title'))) {
      first = false;
      continue;
    }
    const cipher = makeLoginCipher();
    cipher.name = val(r[0], '--');
    cipher.notes = val(r[r.length - 1]);
    const hasLoginHints = r.some((x) => ['username', 'password', 'email', 'url'].includes(txt(x).toLowerCase()));
    const hasCardHints = r.some((x) => ['cardholder', 'number', 'expiry date'].includes(txt(x).toLowerCase()));
    if (r.length === 2 || !hasLoginHints) {
      cipher.type = 2;
      cipher.login = null;
      cipher.secureNote = { type: 0 };
    }
    if (hasCardHints) {
      cipher.type = 3;
      cipher.login = null;
      cipher.card = { cardholderName: null, number: null, brand: null, expMonth: null, expYear: null, code: null };
    }
    if (r.length > 2 && r.length % 2 === 0) {
      for (let i = 0; i < r.length - 2; i += 2) {
        const fieldName = txt(r[i + 1]);
        const fieldValue = txt(r[i + 2]);
        if (!fieldValue) continue;
        const low = fieldName.toLowerCase();
        if (cipher.type === 1) {
          const login = cipher.login as Record<string, unknown>;
          if (low === 'url' && !Array.isArray(login.uris)) {
            const uri = normalizeUri(fieldValue);
            login.uris = uri ? [{ uri, match: null }] : null;
            continue;
          }
          if ((low === 'username' || low === 'email') && !txt(login.username)) {
            login.username = fieldValue;
            continue;
          }
          if (low === 'password' && !txt(login.password)) {
            login.password = fieldValue;
            continue;
          }
          if (low === 'totp' && !txt(login.totp)) {
            login.totp = fieldValue;
            continue;
          }
        } else if (cipher.type === 3 && cipher.card) {
          const card = cipher.card as Record<string, unknown>;
          if (low === 'cardholder' && !txt(card.cardholderName)) {
            card.cardholderName = fieldValue;
            continue;
          }
          if (low === 'number' && !txt(card.number)) {
            card.number = fieldValue;
            card.brand = cardBrand(fieldValue);
            continue;
          }
          if (low === 'cvc' && !txt(card.code)) {
            card.code = fieldValue;
            continue;
          }
          if (low === 'expiry date' && !txt(card.expMonth) && !txt(card.expYear)) {
            const m = fieldValue.match(/^0?([1-9]|1[0-2])\/((?:[1-2][0-9])?[0-9]{2})$/);
            if (m) {
              card.expMonth = m[1];
              card.expYear = m[2].length === 2 ? `20${m[2]}` : m[2];
              continue;
            }
          }
          if (low === 'type') continue;
        }
        processKvp(cipher, fieldName, fieldValue, false);
      }
    }
    result.ciphers.push(cipher);
  }
  return result;
}

function parseEnpassJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as { folders?: any[]; items?: any[] };
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const folderTitleById = new Map<string, string>();
  for (const f of parsed.folders || []) {
    if (f?.uuid && f?.title) folderTitleById.set(String(f.uuid), String(f.title).trim());
  }

  for (const item of parsed.items || []) {
    const cipher = makeLoginCipher();
    cipher.name = val(item?.title, '--');
    cipher.favorite = Number(item?.favorite || 0) > 0;
    cipher.notes = val(item?.note);
    const templateType = txt(item?.template_type);
    const fields = Array.isArray(item?.fields) ? item.fields : [];

    if (templateType.startsWith('creditcard.')) {
      cipher.type = 3;
      cipher.login = null;
      const card: Record<string, unknown> = {
        cardholderName: null,
        number: null,
        code: null,
        expMonth: null,
        expYear: null,
        brand: null,
      };
      for (const field of fields) {
        const t = txt(field?.type);
        const v = txt(field?.value);
        if (!v || t === 'section' || t === 'ccType') continue;
        if (t === 'ccName' && !txt(card.cardholderName)) card.cardholderName = v;
        else if (t === 'ccNumber' && !txt(card.number)) {
          card.number = v;
          card.brand = cardBrand(v);
        } else if (t === 'ccCvc' && !txt(card.code)) card.code = v;
        else if (t === 'ccExpiry' && !txt(card.expYear)) {
          const m = v.match(/^0?([1-9]|1[0-2])\/((?:[1-2][0-9])?[0-9]{2})$/);
          if (m) {
            card.expMonth = m[1];
            card.expYear = m[2].length === 2 ? `20${m[2]}` : m[2];
          } else {
            processKvp(cipher, txt(field?.label), v, Number(field?.sensitive || 0) === 1);
          }
        } else {
          processKvp(cipher, txt(field?.label), v, Number(field?.sensitive || 0) === 1);
        }
      }
      cipher.card = card;
    } else if (templateType.startsWith('login.') || templateType.startsWith('password.') || fields.some((f: any) => txt(f?.type) === 'password' && txt(f?.value))) {
      const login = cipher.login as Record<string, unknown>;
      const urls: string[] = [];
      for (const field of fields) {
        const t = txt(field?.type);
        const v = txt(field?.value);
        if (!v || t === 'section') continue;
        if ((t === 'username' || t === 'email') && !txt(login.username)) login.username = v;
        else if (t === 'password' && !txt(login.password)) login.password = v;
        else if (t === 'totp' && !txt(login.totp)) login.totp = v;
        else if (t === 'url') {
          const n = normalizeUri(v);
          if (n) urls.push(n);
        } else if (t === '.Android#') {
          let cleaned = v.startsWith('androidapp://') ? v : `androidapp://${v}`;
          cleaned = cleaned.replace('android://', '').replace(/androidapp:\/\/.*==@/g, 'androidapp://');
          const n = normalizeUri(cleaned) || cleaned;
          urls.push(n);
        } else {
          processKvp(cipher, txt(field?.label), v, Number(field?.sensitive || 0) === 1);
        }
      }
      login.uris = urls.length ? urls.map((u) => ({ uri: u, match: null })) : null;
    } else {
      cipher.type = 2;
      cipher.login = null;
      cipher.secureNote = { type: 0 };
      for (const field of fields) {
        const v = txt(field?.value);
        if (!v || txt(field?.type) === 'section') continue;
        processKvp(cipher, txt(field?.label), v, Number(field?.sensitive || 0) === 1);
      }
    }

    const idx = result.ciphers.push(cipher) - 1;
    const folderId = Array.isArray(item?.folders) && item.folders.length ? String(item.folders[0]) : '';
    if (folderId && folderTitleById.has(folderId)) addFolder(result, folderTitleById.get(folderId) || '', idx);
  }
  return result;
}

function parseKeeperCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsvRows(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    if (row.length < 6) continue;
    const cipher = makeLoginCipher();
    cipher.name = val(row[1], '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row[2]);
    login.password = val(row[3]);
    const uri = normalizeUri(row[4] || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    cipher.notes = val(row[5]);
    if (row.length > 7) {
      for (let i = 7; i < row.length; i += 2) {
        const k = txt(row[i]);
        const v = txt(row[i + 1]);
        if (!k) continue;
        if (k === 'TFC:Keeper') (cipher.login as Record<string, unknown>).totp = val(v);
        else processKvp(cipher, k, v, false);
      }
    }
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, row[0], idx);
  }
  return result;
}

function parseKeeperJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as { records?: any[] };
  const records = Array.isArray(parsed.records) ? parsed.records : [];
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const record of records) {
    const cipher = makeLoginCipher();
    cipher.name = val(record.title, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(record.login);
    login.password = val(record.password);
    const uri = normalizeUri(record.login_url || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    cipher.notes = val(record.notes);
    const cf = record.custom_fields || {};
    if (cf['TFC:Keeper']) login.totp = val(cf['TFC:Keeper']);
    for (const key of Object.keys(cf)) {
      if (key === 'TFC:Keeper') continue;
      processKvp(cipher, key, String(cf[key] ?? ''), false);
    }
    if (Array.isArray(record.folders)) {
      const idx = result.ciphers.push(cipher) - 1;
      for (const f of record.folders) {
        const folderName = f?.folder || f?.shared_folder;
        if (folderName) addFolder(result, String(folderName), idx);
      }
    } else {
      result.ciphers.push(cipher);
    }
  }
  return result;
}

function parseLogMeOnceCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsvRows(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    if (row.length < 4) continue;
    const cipher = makeLoginCipher();
    cipher.name = val(row[0], '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row[2]);
    login.password = val(row[3]);
    const uri = normalizeUri(row[1] || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    result.ciphers.push(cipher);
  }
  return result;
}

function parseMeldiumCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(row.DisplayName, '--');
    cipher.notes = val(row.Notes);
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.UserName);
    login.password = val(row.Password);
    const uri = normalizeUri(row.Url || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    result.ciphers.push(cipher);
  }
  return result;
}

function splitPipedField(raw: string): string {
  const s = txt(raw);
  if (!s) return '';
  const p = s.split('|');
  if (p.length <= 2) return s;
  return [...p.slice(0, 2), p.slice(2).join('|')].pop() || '';
}

function parseMSecureCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsvRows(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    if (row.length < 3) continue;
    const folderName = txt(row[2]) && txt(row[2]) !== 'Unassigned' ? row[2] : '';
    const type = txt(row[1]);
    const cipher = makeLoginCipher();
    cipher.name = val(txt(row[0]).split('|')[0], '--');

    if (type === 'Web Logins' || type === 'Login') {
      const login = cipher.login as Record<string, unknown>;
      login.username = val(splitPipedField(row[5] || ''));
      login.password = val(splitPipedField(row[6] || ''));
      const uri = normalizeUri(splitPipedField(row[4] || '') || '');
      login.uris = uri ? [{ uri, match: null }] : null;
      cipher.notes = val((row[3] || '').split('\\n').join('\n'));
    } else if (type === 'Credit Card') {
      cipher.type = 3;
      cipher.login = null;
      const cardNumber = val(splitPipedField(row[4] || ''));
      let expMonth: string | null = null;
      let expYear: string | null = null;
      const exp = splitPipedField(row[5] || '');
      const m = exp.match(/^(\d{1,2})\s*\/\s*(\d{2,4})$/);
      if (m) {
        expMonth = m[1];
        expYear = m[2].length === 2 ? `20${m[2]}` : m[2];
      }
      let code: string | null = null;
      let holder: string | null = null;
      for (const entry of row) {
        if (/^Security Code\|\d*\|/.test(entry)) code = val(splitPipedField(entry));
        if (/^Name on Card\|\d*\|/.test(entry)) holder = val(splitPipedField(entry));
      }
      const noteRegex = /\|\d*\|/;
      const rawNotes = row.slice(2).filter((entry) => txt(entry) && !noteRegex.test(entry));
      const indexedNotes = [8, 10, 11]
        .filter((idx) => row[idx] && noteRegex.test(row[idx]))
        .map((idx) => `${txt(row[idx]).split('|')[0]}: ${splitPipedField(row[idx])}`);
      cipher.notes = [...rawNotes, ...indexedNotes].join('\n') || null;
      cipher.card = {
        number: cardNumber,
        cardholderName: holder,
        code,
        expMonth,
        expYear,
        brand: cardBrand(cardNumber),
      };
    } else if (row.length > 3) {
      cipher.type = 2;
      cipher.login = null;
      cipher.secureNote = { type: 0 };
      const noteLines: string[] = [];
      for (let i = 3; i < row.length; i++) {
        if (txt(row[i])) noteLines.push(row[i]);
      }
      cipher.notes = noteLines.join('\n') || null;
    }

    if (txt(type) && Number(cipher.type) !== 1 && Number(cipher.type) !== 3) {
      cipher.name = `${type}: ${txt(cipher.name)}`;
    }
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, folderName, idx);
  }
  return result;
}

function parseMykiCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const mappedBase = new Set(['nickname', 'additionalInfo']);
  function unmapped(cipher: Record<string, unknown>, row: CsvRow, mapped: Set<string>): void {
    for (const key of Object.keys(row)) {
      if (mapped.has(key)) continue;
      processKvp(cipher, key, row[key], false);
    }
  }

  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.name = val(row.nickname, '--');
    cipher.notes = val(txt(row.additionalInfo).replace(/\s+$/g, ''));

    if (row.url !== undefined) {
      const mapped = new Set([...mappedBase, 'url', 'username', 'password', 'twofaSecret']);
      const login = cipher.login as Record<string, unknown>;
      const uri = normalizeUri(row.url || '');
      login.uris = uri ? [{ uri, match: null }] : null;
      login.username = val(row.username);
      login.password = val(row.password);
      login.totp = val(row.twofaSecret);
      unmapped(cipher, row, mapped);
    } else if (row.authToken !== undefined) {
      const mapped = new Set([...mappedBase, 'authToken']);
      (cipher.login as Record<string, unknown>).totp = val(row.authToken);
      unmapped(cipher, row, mapped);
    } else if (row.cardNumber !== undefined) {
      const mapped = new Set([...mappedBase, 'cardNumber', 'cardName', 'exp_month', 'exp_year', 'cvv']);
      cipher.type = 3;
      cipher.login = null;
      cipher.card = {
        cardholderName: val(row.cardName),
        number: val(row.cardNumber),
        brand: cardBrand(val(row.cardNumber)),
        expMonth: val(row.exp_month),
        expYear: val(row.exp_year),
        code: val(row.cvv),
      };
      unmapped(cipher, row, mapped);
    } else if (row.firstName !== undefined) {
      const mapped = new Set([
        ...mappedBase,
        'title',
        'firstName',
        'middleName',
        'lastName',
        'email',
        'firstAddressLine',
        'secondAddressLine',
        'city',
        'country',
        'zipCode',
      ]);
      cipher.type = 4;
      cipher.login = null;
      cipher.identity = {
        title: val(row.title),
        firstName: val(row.firstName),
        middleName: val(row.middleName),
        lastName: val(row.lastName),
        phone: val((row as Record<string, string>).number),
        email: val(row.email),
        address1: val(row.firstAddressLine),
        address2: val(row.secondAddressLine),
        city: val(row.city),
        country: val(row.country),
        postalCode: val(row.zipCode),
      };
      unmapped(cipher, row, mapped);
    } else if (row.idType !== undefined) {
      const mapped = new Set([...mappedBase, 'idName', 'idNumber', 'idCountry']);
      const fullName = txt((row as Record<string, string>).idName);
      const parts = fullName.split(/\s+/).filter(Boolean);
      const idType = txt((row as Record<string, string>).idType);
      const idNumber = val((row as Record<string, string>).idNumber);
      cipher.type = 4;
      cipher.login = null;
      cipher.identity = {
        firstName: parts[0] || null,
        middleName: parts.length >= 3 ? parts[1] : null,
        lastName: parts.length >= 2 ? parts.slice(parts.length >= 3 ? 2 : 1).join(' ') : null,
        country: val((row as Record<string, string>).idCountry),
        passportNumber: idType === 'Passport' ? idNumber : null,
        ssn: idType === 'Social Security' ? idNumber : null,
        licenseNumber: idType !== 'Passport' && idType !== 'Social Security' ? idNumber : null,
      };
      unmapped(cipher, row, mapped);
    } else if (row.content !== undefined) {
      const mapped = new Set([...mappedBase, 'content']);
      cipher.type = 2;
      cipher.login = null;
      cipher.secureNote = { type: 0 };
      cipher.notes = val(txt(row.content).replace(/\s+$/g, ''));
      unmapped(cipher, row, mapped);
    } else {
      continue;
    }
    result.ciphers.push(cipher);
  }
  return result;
}

function parseNetwrixCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const mapped = new Set(['Organisationseinheit', 'Informationen', 'Beschreibung', 'Benutzername', 'Passwort', 'Internetseite', 'One-Time Passwort']);
  for (const row of rows) {
    const cipher = makeLoginCipher();
    cipher.notes = val(txt(row.Informationen).replace(/\s+$/g, ''));
    cipher.name = val(row.Beschreibung, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.Benutzername);
    login.password = val(row.Passwort);
    login.totp = val((row as Record<string, string>)['One-Time Passwort']);
    const uri = normalizeUri(row.Internetseite || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    for (const key of Object.keys(row)) {
      if (mapped.has(key)) continue;
      processKvp(cipher, key, row[key], false);
    }
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, row.Organisationseinheit, idx);
  }
  return result;
}

function parseRoboFormCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    const cipher = makeLoginCipher();
    const folder = txt(row.Folder).startsWith('/') ? txt(row.Folder).slice(1) : txt(row.Folder);
    cipher.notes = val(row.Note);
    cipher.name = val(row.Name, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(row.Login);
    login.password = val(row.Pwd, val(row.Password));
    const uri = normalizeUri(row.Url || row.URL || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    if (txt(row.Rf_fields)) processKvp(cipher, 'Rf_fields', txt(row.Rf_fields), true);
    if (txt(row.RfFieldsV2)) processKvp(cipher, 'RfFieldsV2', txt(row.RfFieldsV2), true);

    convertToNoteIfNeeded(cipher);
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, folder, idx);
  }
  return result;
}

function parseZohoVaultCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const row of rows) {
    if (!txt(row['Password Name']) && !txt(row['Secret Name'])) continue;
    const cipher = makeLoginCipher();
    cipher.favorite = txt(row.Favorite) === '1';
    cipher.notes = val(row.Notes);
    cipher.name = val(row['Password Name'], val(row['Secret Name'], '--'));
    const login = cipher.login as Record<string, unknown>;
    const uri = normalizeUri(txt(row['Password URL']) || txt(row['Secret URL']));
    login.uris = uri ? [{ uri, match: null }] : null;
    login.totp = val(row.login_totp);

    const parseData = (data: string) => {
      if (!txt(data)) return;
      for (const line of data.split(/\r?\n/)) {
        const pos = line.indexOf(':');
        if (pos < 0) continue;
        const key = txt(line.slice(0, pos));
        const value = txt(line.slice(pos + 1));
        if (!key || !value || key === 'SecretType') continue;
        const low = key.toLowerCase();
        if (!txt(login.username) && ['username', 'user', 'email', 'login', 'id'].includes(low)) login.username = value;
        else if (!txt(login.password) && ['password', 'pass', 'passwd'].includes(low)) login.password = value;
        else processKvp(cipher, key, value, false);
      }
    };
    parseData(txt(row.SecretData));
    parseData(txt(row.CustomData));

    convertToNoteIfNeeded(cipher);
    const idx = result.ciphers.push(cipher) - 1;
    addFolder(result, row['Folder Name'], idx);
  }
  return result;
}

function parseNordpassCsv(textRaw: string): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const r of rows) {
    const t = txt(r.type);
    if (!t) continue;
    if (t === 'password') {
      const cipher = makeLoginCipher();
      cipher.name = val(r.name, '--');
      cipher.notes = val(r.note);
      const login = cipher.login as Record<string, unknown>;
      login.username = val(r.username);
      login.password = val(r.password);
      const uris: string[] = [];
      const main = normalizeUri(r.url || '');
      if (main) uris.push(main);
      if (txt(r.additional_urls)) {
        try {
          const extra = JSON.parse(r.additional_urls) as string[];
          for (const u of extra || []) {
            const n = normalizeUri(u || '');
            if (n) uris.push(n);
          }
        } catch {}
      }
      login.uris = uris.length ? uris.map((u) => ({ uri: u, match: null })) : null;
      if (txt(r.custom_fields)) {
        try {
          const cfs = JSON.parse(r.custom_fields) as Array<{ label?: string; type?: string; value?: string }>;
          for (const cf of cfs || []) processKvp(cipher, cf.label || '', cf.value || '', cf.type === 'hidden');
        } catch {}
      }
      const idx = result.ciphers.push(cipher) - 1;
      addFolder(result, r.folder, idx);
      continue;
    }
    if (t === 'note') {
      const idx = result.ciphers.push({
        type: 2,
        name: val(r.name, '--'),
        notes: val(r.note),
        favorite: false,
        reprompt: 0,
        key: null,
        login: null,
        card: null,
        identity: null,
        secureNote: { type: 0 },
        fields: null,
        passwordHistory: null,
        sshKey: null,
      }) - 1;
      addFolder(result, r.folder, idx);
      continue;
    }
    if (t === 'credit_card') {
      const idx = result.ciphers.push({
        type: 3,
        name: val(r.name, '--'),
        notes: val(r.note),
        favorite: false,
        reprompt: 0,
        key: null,
        login: null,
        card: {
          cardholderName: val(r.cardholdername),
          number: val(r.cardnumber),
          code: val(r.cvc),
          expMonth: null,
          expYear: null,
          brand: cardBrand(val(r.cardnumber)),
        },
        identity: null,
        secureNote: null,
        fields: null,
        passwordHistory: null,
        sshKey: null,
      }) - 1;
      addFolder(result, r.folder, idx);
      continue;
    }
    if (t === 'identity') {
      const full = txt(r.full_name);
      const parts = full.split(/\s+/).filter(Boolean);
      const identity: Record<string, unknown> = {
        firstName: parts[0] || null,
        middleName: parts.length >= 3 ? parts[1] : null,
        lastName: parts.length >= 2 ? parts.slice(parts.length >= 3 ? 2 : 1).join(' ') : null,
        phone: val(r.phone_number),
        email: val(r.email),
        address1: val(r.address1),
        address2: val(r.address2),
        city: val(r.city),
        state: val(r.state),
        postalCode: val(r.zipcode),
        country: txt(r.country).toUpperCase() || null,
      };
      const idx = result.ciphers.push({
        type: 4,
        name: val(r.name, '--'),
        notes: val(r.note),
        favorite: false,
        reprompt: 0,
        key: null,
        login: null,
        card: null,
        identity,
        secureNote: null,
        fields: null,
        passwordHistory: null,
        sshKey: null,
      }) - 1;
      addFolder(result, r.folder, idx);
    }
  }
  return result;
}

function parsePassmanJson(textRaw: string): CiphersImportPayload {
  const rows = JSON.parse(textRaw) as any[];
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const c of rows || []) {
    const cipher = makeLoginCipher();
    cipher.name = val(c.label, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(c.username, val(c.email));
    login.password = val(c.password);
    const uri = normalizeUri(c.url || '');
    login.uris = uri ? [{ uri, match: null }] : null;
    login.totp = val(c?.otp?.secret);
    const email = txt(c.email);
    const desc = txt(c.description);
    cipher.notes = `${login.username && email && txt(login.username) !== email ? `Email: ${email}\n` : ''}${desc}` || null;
    for (const cf of c.custom_fields || []) {
      const t = txt(cf.field_type);
      if (t === 'text' || t === 'password') processKvp(cipher, cf.label || '', cf.value || '', false);
    }
    const idx = result.ciphers.push(cipher) - 1;
    const folder = c?.tags?.[0]?.text;
    if (folder) addFolder(result, String(folder), idx);
  }
  return result;
}

function parsePasskyJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as { encrypted?: boolean; passwords?: any[] };
  if (parsed.encrypted === true) throw new Error('Unable to import an encrypted passky backup.');
  const list = Array.isArray(parsed.passwords) ? parsed.passwords : [];
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const p of list) {
    const cipher = makeLoginCipher();
    cipher.name = val(p.website, '--');
    const login = cipher.login as Record<string, unknown>;
    login.username = val(p.username);
    login.password = val(p.password);
    const uri = normalizeUri(String(p.website || ''));
    login.uris = uri ? [{ uri, match: null }] : null;
    cipher.notes = val(p.message);
    result.ciphers.push(cipher);
  }
  return result;
}

function parsePsonoJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as any;
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };

  function parseItem(item: any, folderName: string | null) {
    if (!item || typeof item !== 'object') return;
    const type = txt(item.type);
    const cipher = makeLoginCipher();
    if (type === 'website_password') {
      cipher.name = val(item.website_password_title, '--');
      cipher.notes = val(item.website_password_notes);
      const login = cipher.login as Record<string, unknown>;
      login.username = val(item.website_password_username);
      login.password = val(item.website_password_password);
      const uri = normalizeUri(item.website_password_url || '');
      login.uris = uri ? [{ uri, match: null }] : null;
      const idx = result.ciphers.push(cipher) - 1;
      if (folderName) addFolder(result, folderName, idx);
      return;
    }
    if (type === 'application_password') {
      cipher.name = val(item.application_password_title, '--');
      cipher.notes = val(item.application_password_notes);
      const login = cipher.login as Record<string, unknown>;
      login.username = val(item.application_password_username);
      login.password = val(item.application_password_password);
      const idx = result.ciphers.push(cipher) - 1;
      if (folderName) addFolder(result, folderName, idx);
      return;
    }
    if (type === 'totp') {
      cipher.name = val(item.totp_title, '--');
      cipher.notes = val(item.totp_notes);
      (cipher.login as Record<string, unknown>).totp = val(item.totp_code);
      const idx = result.ciphers.push(cipher) - 1;
      if (folderName) addFolder(result, folderName, idx);
      return;
    }
    if (type === 'bookmark') {
      cipher.name = val(item.bookmark_title, '--');
      cipher.notes = val(item.bookmark_notes);
      const uri = normalizeUri(item.bookmark_url || '');
      (cipher.login as Record<string, unknown>).uris = uri ? [{ uri, match: null }] : null;
      const idx = result.ciphers.push(cipher) - 1;
      if (folderName) addFolder(result, folderName, idx);
      return;
    }
    if (type === 'note' || type === 'environment_variables') {
      const secure = {
        type: 2,
        name: val(type === 'note' ? item.note_title : item.environment_variables_title, '--'),
        notes: val(type === 'note' ? item.note_notes : item.environment_variables_notes),
        favorite: false,
        reprompt: 0,
        key: null,
        login: null,
        card: null,
        identity: null,
        secureNote: { type: 0 },
        fields: null,
        passwordHistory: null,
        sshKey: null,
      } as Record<string, unknown>;
      const idx = result.ciphers.push(secure) - 1;
      if (folderName) addFolder(result, folderName, idx);
    }
  }

  function walkFolders(folders: any[], parent: string | null) {
    for (const f of folders || []) {
      const name = parent ? `${parent}/${txt(f.name)}` : txt(f.name);
      for (const item of f.items || []) parseItem(item, name);
      if (Array.isArray(f.folders)) walkFolders(f.folders, name);
    }
  }

  for (const item of parsed.items || []) parseItem(item, null);
  walkFolders(parsed.folders || [], null);
  return result;
}

function parsePasswordBossJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as { folders?: any[]; items?: any[] };
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const folderNameById = new Map<string, string>();
  for (const f of parsed.folders || []) {
    if (f?.id && f?.name) folderNameById.set(String(f.id), String(f.name));
  }
  for (const item of parsed.items || []) {
    const ids = item?.identifiers || {};
    const isCard = txt(item?.type) === 'CreditCard';
    const base = isCard
      ? {
          type: 3,
          name: val(item?.name, '--'),
          notes: val(ids.notes),
          favorite: false,
          reprompt: 0,
          key: null,
          login: null,
          card: {
            number: val(ids.cardNumber),
            cardholderName: val(ids.nameOnCard),
            code: val(ids.security_code),
            brand: cardBrand(val(ids.cardNumber)),
            expMonth: null,
            expYear: null,
          },
          identity: null,
          secureNote: null,
          fields: [],
          passwordHistory: null,
          sshKey: null,
        }
      : makeLoginCipher();
    if (!isCard) {
      base.name = val(item?.name, '--');
      base.notes = val(ids.notes);
      const login = base.login as Record<string, unknown>;
      login.username = val(ids.username, val(ids.email));
      login.password = val(ids.password);
      login.totp = val(ids.totp);
      const uri = normalizeUri(item?.login_url || ids.url || '');
      login.uris = uri ? [{ uri, match: null }] : null;
    }
    if (Array.isArray(ids.custom_fields)) {
      for (const cf of ids.custom_fields) processKvp(base as Record<string, unknown>, cf?.name || '', cf?.value || '', false);
    }
    const idx = result.ciphers.push(base as Record<string, unknown>) - 1;
    const folderId = item?.folder;
    if (folderId && folderNameById.has(String(folderId))) addFolder(result, folderNameById.get(String(folderId)) || '', idx);
  }
  return result;
}

function parseOnePasswordCsv(textRaw: string, isMac: boolean): CiphersImportPayload {
  const rows = parseCsv(textRaw);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const ignored = new Set(['ainfo', 'autosubmit', 'notesplain', 'ps', 'scope', 'tags', 'title', 'uuid', 'notes', 'type']);
  for (const row of rows) {
    const title = txt(row.title || row.Title);
    if (!title) continue;
    const cipher = makeLoginCipher();
    cipher.name = title || '--';
    cipher.notes = `${txt(row.notesPlain)}\n${txt(row.notes)}`.trim() || null;

    let type: 1 | 2 | 3 | 4 = 1;
    if (isMac) {
      const t = txt(row.type).toLowerCase();
      if (t === 'credit card') type = 3;
      else if (t === 'identity') type = 4;
      else if (t === 'secure note') type = 2;
    } else {
      const values = Object.keys(row).map((k) => `${k}:${txt(row[k])}`.toLowerCase());
      const hasCard = values.some((x) => /number/i.test(x)) && values.some((x) => /expiry date/i.test(x));
      const hasIdentity = values.some((x) => /first name|initial|last name|email/.test(x));
      if (hasCard) type = 3;
      else if (hasIdentity) type = 4;
    }
    if (type === 2) {
      cipher.type = 2;
      cipher.login = null;
      cipher.secureNote = { type: 0 };
    } else if (type === 3) {
      cipher.type = 3;
      cipher.login = null;
      cipher.card = { cardholderName: null, number: null, brand: null, expMonth: null, expYear: null, code: null };
    } else if (type === 4) {
      cipher.type = 4;
      cipher.login = null;
      cipher.identity = {
        firstName: null,
        middleName: null,
        lastName: null,
        username: null,
        email: null,
        phone: null,
        company: null,
      };
    }

    let altUsername: string | null = null;
    for (const property of Object.keys(row)) {
      const rawVal = txt(row[property]);
      if (!rawVal) continue;
      const lower = property.toLowerCase();

      if (Number(cipher.type) === 1) {
        const login = cipher.login as Record<string, unknown>;
        if (!txt(login.username) && lower === 'username') {
          login.username = rawVal;
          continue;
        }
        if (!txt(login.password) && lower === 'password') {
          login.password = rawVal;
          continue;
        }
        if ((!Array.isArray(login.uris) || !login.uris.length) && (lower === 'url' || lower === 'website')) {
          const uri = normalizeUri(rawVal);
          login.uris = uri ? [{ uri, match: null }] : null;
          continue;
        }
      } else if (Number(cipher.type) === 3 && cipher.card) {
        const card = cipher.card as Record<string, unknown>;
        if (!txt(card.number) && lower.includes('number')) {
          card.number = rawVal;
          card.brand = cardBrand(rawVal);
          continue;
        }
        if (!txt(card.code) && lower.includes('verification number')) {
          card.code = rawVal;
          continue;
        }
        if (!txt(card.cardholderName) && lower.includes('cardholder name')) {
          card.cardholderName = rawVal;
          continue;
        }
        if ((!txt(card.expMonth) || !txt(card.expYear)) && lower.includes('expiry date')) {
          const { month, year } = parseCardExpiry(rawVal);
          card.expMonth = month;
          card.expYear = year;
          continue;
        }
      } else if (Number(cipher.type) === 4 && cipher.identity) {
        const identity = cipher.identity as Record<string, unknown>;
        if (!txt(identity.firstName) && lower.includes('first name')) {
          identity.firstName = rawVal;
          continue;
        }
        if (!txt(identity.middleName) && lower.includes('initial')) {
          identity.middleName = rawVal;
          continue;
        }
        if (!txt(identity.lastName) && lower.includes('last name')) {
          identity.lastName = rawVal;
          continue;
        }
        if (!txt(identity.username) && lower.includes('username')) {
          identity.username = rawVal;
          continue;
        }
        if (!txt(identity.email) && lower.includes('email')) {
          identity.email = rawVal;
          continue;
        }
        if (!txt(identity.phone) && lower.includes('default phone')) {
          identity.phone = rawVal;
          continue;
        }
        if (!txt(identity.company) && lower.includes('company')) {
          identity.company = rawVal;
          continue;
        }
      }

      if (!ignored.has(lower) && !lower.startsWith('section:') && !lower.startsWith('section ')) {
        if (!altUsername && lower === 'email') altUsername = rawVal;
        if (lower === 'created date' || lower === 'modified date') {
          const readable = parseEpochMaybe(rawVal);
          processKvp(cipher, `1Password ${property}`, readable || rawVal, false);
        } else {
          const hidden = lower.includes('password') || lower.includes('key') || lower.includes('secret');
          processKvp(cipher, property, rawVal, hidden);
        }
      }
    }
    if (Number(cipher.type) === 1 && !txt((cipher.login as Record<string, unknown>).username) && altUsername && !altUsername.includes('://')) {
      (cipher.login as Record<string, unknown>).username = altUsername;
    }
    convertToNoteIfNeeded(cipher);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseOnePasswordFieldsIntoCipher(cipher: Record<string, unknown>, fields: any[], designationKey: string, valueKey: string, nameKey: string): void {
  for (const field of fields || []) {
    const raw = field?.[valueKey];
    if (raw === null || raw === undefined || txt(raw) === '') continue;
    const designation = txt(field?.[designationKey]).toLowerCase();
    const k = txt(field?.k).toLowerCase();
    const fieldName = txt(field?.[nameKey] ?? field?.t ?? field?.title) || 'no_name';
    let value = txt(raw);
    if (k === 'date') {
      const asDate = parseEpochMaybe(raw);
      value = asDate ? new Date(asDate).toUTCString() : value;
    }
    if (Number(cipher.type) === 1) {
      const login = cipher.login as Record<string, unknown>;
      if (!txt(login.username) && designation === 'username') {
        login.username = value;
        continue;
      }
      if (!txt(login.password) && designation === 'password') {
        login.password = value;
        continue;
      }
      if (!txt(login.totp) && designation.startsWith('totp_')) {
        login.totp = value;
        continue;
      }
    } else if (Number(cipher.type) === 3 && cipher.card) {
      const card = cipher.card as Record<string, unknown>;
      if (!txt(card.number) && designation === 'ccnum') {
        card.number = value;
        card.brand = cardBrand(value);
        continue;
      }
      if (!txt(card.code) && designation === 'cvv') {
        card.code = value;
        continue;
      }
      if (!txt(card.cardholderName) && designation === 'cardholder') {
        card.cardholderName = value;
        continue;
      }
      if ((!txt(card.expMonth) || !txt(card.expYear)) && designation === 'expiry') {
        const { month, year } = parseCardExpiry(value);
        card.expMonth = month;
        card.expYear = year;
        continue;
      }
      if (designation === 'type') continue;
    } else if (Number(cipher.type) === 4 && cipher.identity) {
      const identity = cipher.identity as Record<string, unknown>;
      if (!txt(identity.firstName) && designation === 'firstname') {
        identity.firstName = value;
        continue;
      }
      if (!txt(identity.lastName) && designation === 'lastname') {
        identity.lastName = value;
        continue;
      }
      if (!txt(identity.middleName) && designation === 'initial') {
        identity.middleName = value;
        continue;
      }
      if (!txt(identity.phone) && designation === 'defphone') {
        identity.phone = value;
        continue;
      }
      if (!txt(identity.company) && designation === 'company') {
        identity.company = value;
        continue;
      }
      if (!txt(identity.email) && designation === 'email') {
        identity.email = value;
        continue;
      }
      if (!txt(identity.username) && designation === 'username') {
        identity.username = value;
        continue;
      }
      if (designation === 'address' && raw && typeof raw === 'object') {
        const addr = raw as Record<string, unknown>;
        identity.address1 = val(addr.street);
        identity.city = val(addr.city);
        identity.country = txt(addr.country) ? txt(addr.country).toUpperCase() : null;
        identity.postalCode = val(addr.zip);
        identity.state = val(addr.state);
        continue;
      }
    }
    processKvp(cipher, fieldName, value, k === 'concealed');
  }
}

function parseOnePasswordPasswordHistory(cipher: Record<string, unknown>, history: any[]): void {
  const parsed = (history || [])
    .map((h) => ({ password: val(h?.value), lastUsedDate: parseEpochMaybe(h?.time) }))
    .filter((x) => !!x.password && !!x.lastUsedDate)
    .sort((a, b) => String(b.lastUsedDate).localeCompare(String(a.lastUsedDate)))
    .slice(0, 5);
  cipher.passwordHistory = parsed.length ? parsed : null;
}

function parseOnePassword1Pif(textRaw: string): CiphersImportPayload {
  const lines = textRaw.split(/\r?\n/);
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.startsWith('{')) continue;
    let item: any;
    try {
      item = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (item?.trashed === true) continue;
    const cipher = makeLoginCipher();
    cipher.name = val(item?.title || item?.overview?.title, '--');
    cipher.favorite = !!item?.openContents?.faveIndex;

    let type = onePasswordTypeHints(item?.typeName);
    const details = item?.details || item?.secureContents || {};
    if (details?.ccnum || details?.cvv) type = 3;
    if (details?.firstname || details?.address1) type = 4;
    if (type === 2) {
      cipher.type = 2;
      cipher.login = null;
      cipher.secureNote = { type: 0 };
    } else if (type === 3) {
      cipher.type = 3;
      cipher.login = null;
      cipher.card = { cardholderName: null, number: null, brand: null, expMonth: null, expYear: null, code: null };
    } else if (type === 4) {
      cipher.type = 4;
      cipher.login = null;
      cipher.identity = {
        firstName: null,
        middleName: null,
        lastName: null,
        phone: null,
        email: null,
        username: null,
        company: null,
      };
    }

    const uris: string[] = [];
    const locationUri = normalizeUri(item?.location || '');
    if (locationUri) uris.push(locationUri);
    for (const u of item?.URLs || item?.secureContents?.URLs || item?.overview?.URLs || []) {
      const uri = normalizeUri(u?.url || u?.u || '');
      if (uri) uris.push(uri);
    }
    if (Number(cipher.type) === 1) {
      (cipher.login as Record<string, unknown>).uris = uris.length ? uris.map((uri) => ({ uri, match: null })) : null;
      (cipher.login as Record<string, unknown>).password = val(details?.password);
    }
    cipher.notes = val(details?.notesPlain);
    parseOnePasswordPasswordHistory(cipher, details?.passwordHistory || []);
    parseOnePasswordFieldsIntoCipher(cipher, details?.fields || [], 'designation', 'value', 'name');
    for (const section of details?.sections || []) {
      parseOnePasswordFieldsIntoCipher(cipher, section?.fields || [], 'n', 'v', 't');
    }
    convertToNoteIfNeeded(cipher);
    result.ciphers.push(cipher);
  }
  return result;
}

function parseOnePassword1PuxJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as { accounts?: any[] };
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const accounts = Array.isArray(parsed?.accounts) ? parsed.accounts : [];
  for (const account of accounts) {
    for (const vault of account?.vaults || []) {
      const vaultName = txt(vault?.attrs?.name);
      for (const item of vault?.items || []) {
        if (txt(item?.state) === 'archived') continue;
        const cipher = makeLoginCipher();
        const categoryType = onePasswordCategoryType(item?.categoryUuid);
        if (categoryType === 2) {
          cipher.type = 2;
          cipher.login = null;
          cipher.secureNote = { type: 0 };
        } else if (categoryType === 3) {
          cipher.type = 3;
          cipher.login = null;
          cipher.card = { cardholderName: null, number: null, brand: null, expMonth: null, expYear: null, code: null };
        } else if (categoryType === 4) {
          cipher.type = 4;
          cipher.login = null;
          cipher.identity = {
            firstName: null,
            middleName: null,
            lastName: null,
            phone: null,
            email: null,
            username: null,
            company: null,
            address1: null,
            city: null,
            state: null,
            postalCode: null,
            country: null,
            passportNumber: null,
            ssn: null,
            licenseNumber: null,
          };
        }
        cipher.favorite = Number(item?.favIndex) === 1;
        cipher.name = val(item?.overview?.title, '--');
        cipher.notes = val(item?.details?.notesPlain);

        if (Number(cipher.type) === 1) {
          const urls: string[] = [];
          for (const u of item?.overview?.urls || []) {
            const uri = normalizeUri(u?.url || '');
            if (uri) urls.push(uri);
          }
          const fallbackUrl = normalizeUri(item?.overview?.url || '');
          if (fallbackUrl) urls.push(fallbackUrl);
          (cipher.login as Record<string, unknown>).uris = urls.length ? urls.map((uri) => ({ uri, match: null })) : null;
        }

        for (const loginField of item?.details?.loginFields || []) {
          const lv = txt(loginField?.value);
          if (!lv) continue;
          const designation = txt(loginField?.designation).toLowerCase();
          const fieldName = txt(loginField?.name);
          const fieldType = txt(loginField?.fieldType);
          if (Number(cipher.type) === 1) {
            const login = cipher.login as Record<string, unknown>;
            if (designation === 'username') {
              login.username = lv;
              continue;
            }
            if (designation === 'password') {
              login.password = lv;
              continue;
            }
            if (designation.includes('totp') || fieldName.toLowerCase().includes('totp')) {
              login.totp = lv;
              continue;
            }
          }
          processKvp(cipher, fieldName || designation || 'field', lv, fieldType === 'P');
        }

        const detailsPassword = val(item?.details?.password);
        if (Number(cipher.type) === 1 && detailsPassword && !txt((cipher.login as Record<string, unknown>).password)) {
          (cipher.login as Record<string, unknown>).password = detailsPassword;
        }
        parseOnePasswordPasswordHistory(cipher, item?.details?.passwordHistory || []);

        for (const section of item?.details?.sections || []) {
          for (const field of section?.fields || []) {
            const rawValue = field?.value;
            const valueObj = rawValue && typeof rawValue === 'object' ? (rawValue as Record<string, unknown>) : {};
            const valueKey = Object.keys(valueObj)[0];
            const fieldValueObj = valueKey ? valueObj[valueKey] : null;
            let fieldValue = '';
            let hidden = false;
            if (valueKey === 'concealed') {
              fieldValue = txt(fieldValueObj);
              hidden = true;
            } else if (valueKey === 'date') {
              const iso = parseEpochMaybe(fieldValueObj);
              fieldValue = iso ? new Date(iso).toUTCString() : txt(fieldValueObj);
            } else if (valueKey === 'monthYear') {
              fieldValue = txt(fieldValueObj);
            } else if (valueKey === 'email' && fieldValueObj && typeof fieldValueObj === 'object') {
              fieldValue = txt((fieldValueObj as Record<string, unknown>).email_address);
            } else if (valueKey === 'address' && fieldValueObj && typeof fieldValueObj === 'object') {
              const a = fieldValueObj as Record<string, unknown>;
              fieldValue = [txt(a.street), txt(a.city), txt(a.state), txt(a.zip), txt(a.country)].filter(Boolean).join(', ');
            } else {
              fieldValue = txt(fieldValueObj);
            }
            if (!fieldValue) continue;

            const fieldId = txt(field?.id).toLowerCase();
            const fieldTitle = txt(field?.title);
            const lowTitle = fieldTitle.toLowerCase();
            if (Number(cipher.type) === 1) {
              const login = cipher.login as Record<string, unknown>;
              if (!txt(login.username) && (fieldId === 'username' || lowTitle.includes('username'))) {
                login.username = fieldValue;
                continue;
              }
              if (!txt(login.password) && (fieldId === 'password' || lowTitle.includes('password'))) {
                login.password = fieldValue;
                continue;
              }
              if (!txt(login.totp) && (fieldId.includes('totp') || lowTitle.includes('totp') || lowTitle.includes('otp'))) {
                login.totp = fieldValue;
                continue;
              }
              if ((!Array.isArray(login.uris) || !login.uris.length) && (fieldId === 'url' || lowTitle.includes('url') || lowTitle.includes('website'))) {
                const uri = normalizeUri(fieldValue);
                if (uri) login.uris = [{ uri, match: null }];
                continue;
              }
            } else if (Number(cipher.type) === 3 && cipher.card) {
              const card = cipher.card as Record<string, unknown>;
              if (!txt(card.cardholderName) && (fieldId.includes('cardholder') || lowTitle.includes('cardholder'))) {
                card.cardholderName = fieldValue;
                continue;
              }
              if (!txt(card.number) && (valueKey === 'creditCardNumber' || fieldId.includes('number') || lowTitle.includes('number'))) {
                card.number = fieldValue;
                card.brand = cardBrand(fieldValue);
                continue;
              }
              if (!txt(card.code) && (fieldId === 'cvv' || lowTitle.includes('cvv') || lowTitle.includes('security code'))) {
                card.code = fieldValue;
                continue;
              }
              if ((!txt(card.expMonth) || !txt(card.expYear)) && (valueKey === 'monthYear' || fieldId.includes('expiry') || lowTitle.includes('expiry'))) {
                const { month, year } = parseCardExpiry(fieldValue);
                card.expMonth = month;
                card.expYear = year;
                continue;
              }
            } else if (Number(cipher.type) === 4 && cipher.identity) {
              const identity = cipher.identity as Record<string, unknown>;
              if (!txt(identity.firstName) && (fieldId === 'firstname' || lowTitle.includes('first name'))) {
                identity.firstName = fieldValue;
                continue;
              }
              if (!txt(identity.middleName) && (fieldId === 'initial' || lowTitle.includes('middle') || lowTitle.includes('initial'))) {
                identity.middleName = fieldValue;
                continue;
              }
              if (!txt(identity.lastName) && (fieldId === 'lastname' || lowTitle.includes('last name'))) {
                identity.lastName = fieldValue;
                continue;
              }
              if (!txt(identity.email) && (valueKey === 'email' || fieldId.includes('email') || lowTitle.includes('email'))) {
                identity.email = fieldValue;
                continue;
              }
              if (!txt(identity.phone) && (valueKey === 'phone' || fieldId.includes('phone') || lowTitle.includes('phone'))) {
                identity.phone = fieldValue;
                continue;
              }
              if (!txt(identity.company) && (fieldId.includes('company') || lowTitle.includes('company'))) {
                identity.company = fieldValue;
                continue;
              }
              if (valueKey === 'address' && fieldValueObj && typeof fieldValueObj === 'object') {
                const a = fieldValueObj as Record<string, unknown>;
                identity.address1 = val(a.street);
                identity.city = val(a.city);
                identity.state = val(a.state);
                identity.postalCode = val(a.zip);
                identity.country = txt(a.country) ? txt(a.country).toUpperCase() : null;
                continue;
              }
              if (!txt(identity.passportNumber) && lowTitle.includes('passport')) {
                identity.passportNumber = fieldValue;
                continue;
              }
              if (!txt(identity.ssn) && (lowTitle.includes('social security') || lowTitle === 'ssn')) {
                identity.ssn = fieldValue;
                continue;
              }
              if (!txt(identity.licenseNumber) && lowTitle.includes('license')) {
                identity.licenseNumber = fieldValue;
                continue;
              }
            }
            processKvp(cipher, fieldTitle || fieldId || 'field', fieldValue, hidden);
          }
        }

        convertToNoteIfNeeded(cipher);
        const idx = result.ciphers.push(cipher) - 1;
        if (vaultName) addFolder(result, vaultName, idx);
      }
    }
  }
  return result;
}

function parseProtonPassJson(textRaw: string): CiphersImportPayload {
  const parsed = JSON.parse(textRaw) as { encrypted?: boolean; vaults?: Record<string, any> };
  if (parsed?.encrypted) throw new Error('Unable to import an encrypted Proton Pass export.');
  const result: CiphersImportPayload = { ciphers: [], folders: [], folderRelationships: [] };
  const vaults = parsed?.vaults && typeof parsed.vaults === 'object' ? parsed.vaults : {};
  for (const vault of Object.values(vaults)) {
    const vaultName = txt((vault as Record<string, unknown>).name);
    const items = Array.isArray((vault as Record<string, unknown>).items) ? ((vault as Record<string, unknown>).items as any[]) : [];
    for (const item of items) {
      if (Number(item?.state) === 2) continue;
      const itemType = txt(item?.data?.type);
      const cipher = makeLoginCipher();
      cipher.name = val(item?.data?.metadata?.name, '--');
      cipher.notes = val(item?.data?.metadata?.note);
      cipher.favorite = !!item?.pinned;

      if (itemType === 'login') {
        const content = item?.data?.content || {};
        const login = cipher.login as Record<string, unknown>;
        const urls: string[] = [];
        for (const u of content?.urls || []) {
          const uri = normalizeUri(u || '');
          if (uri) urls.push(uri);
        }
        login.uris = urls.length ? urls.map((uri) => ({ uri, match: null })) : null;
        const username = val(content?.itemUsername);
        const email = val(content?.itemEmail);
        login.username = username || email;
        if (username && email) processKvp(cipher, 'email', email, false);
        login.password = val(content?.password);
        login.totp = val(content?.totpUri);
        for (const extra of item?.data?.extraFields || []) {
          const t = txt(extra?.type);
          const fieldValue = t === 'totp' ? val(extra?.data?.totpUri) : val(extra?.data?.content);
          processKvp(cipher, txt(extra?.fieldName), fieldValue || '', t !== 'text');
        }
      } else if (itemType === 'note') {
        cipher.type = 2;
        cipher.login = null;
        cipher.secureNote = { type: 0 };
      } else if (itemType === 'creditCard') {
        const content = item?.data?.content || {};
        const { month, year } = parseCardExpiry(txt(content?.expirationDate));
        cipher.type = 3;
        cipher.login = null;
        cipher.card = {
          cardholderName: val(content?.cardholderName),
          number: val(content?.number),
          brand: cardBrand(val(content?.number)),
          code: val(content?.verificationNumber),
          expMonth: month,
          expYear: year,
        };
        if (txt(content?.pin)) processKvp(cipher, 'PIN', txt(content.pin), true);
      } else if (itemType === 'identity') {
        const content = item?.data?.content || {};
        const name = splitFullName(val(content?.fullName));
        cipher.type = 4;
        cipher.login = null;
        cipher.identity = {
          firstName: val(content?.firstName) || name.firstName,
          middleName: val(content?.middleName) || name.middleName,
          lastName: val(content?.lastName) || name.lastName,
          email: val(content?.email),
          phone: val(content?.phoneNumber),
          company: val(content?.company),
          ssn: val(content?.socialSecurityNumber),
          passportNumber: val(content?.passportNumber),
          licenseNumber: val(content?.licenseNumber),
          address1: val(content?.organization),
          address2: val(content?.streetAddress),
          address3: `${txt(content?.floor)} ${txt(content?.county)}`.trim() || null,
          city: val(content?.city),
          state: val(content?.stateOrProvince),
          postalCode: val(content?.zipOrPostalCode),
          country: val(content?.countryOrRegion),
        };
        for (const key of Object.keys(content || {})) {
          if (
            [
              'fullName',
              'firstName',
              'middleName',
              'lastName',
              'email',
              'phoneNumber',
              'company',
              'socialSecurityNumber',
              'passportNumber',
              'licenseNumber',
              'organization',
              'streetAddress',
              'floor',
              'county',
              'city',
              'stateOrProvince',
              'zipOrPostalCode',
              'countryOrRegion',
            ].includes(key)
          ) {
            continue;
          }
          if (key === 'extraSections' && Array.isArray(content[key])) {
            for (const section of content[key]) {
              for (const extra of section?.sectionFields || []) {
                processKvp(cipher, txt(extra?.fieldName), txt(extra?.data?.content), txt(extra?.type) === 'hidden');
              }
            }
            continue;
          }
          if (Array.isArray(content[key])) {
            for (const extra of content[key]) {
              processKvp(cipher, txt(extra?.fieldName), txt(extra?.data?.content), txt(extra?.type) === 'hidden');
            }
            continue;
          }
          processKvp(cipher, key, txt(content[key]), false);
        }
        for (const extra of item?.data?.extraFields || []) {
          processKvp(cipher, txt(extra?.fieldName), txt(extra?.data?.content), txt(extra?.type) === 'hidden');
        }
      } else {
        continue;
      }

      const idx = result.ciphers.push(cipher) - 1;
      if (vaultName) addFolder(result, vaultName, idx);
    }
  }
  return result;
}

export function normalizeBitwardenImport(raw: unknown): CiphersImportPayload {
  const parsed = raw as BitwardenJsonInput | null;
  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid Bitwarden JSON');
  if (parsed.encrypted === true) throw new Error('Encrypted export requires encrypted import flow.');

  const foldersRaw = Array.isArray(parsed.folders) ? parsed.folders : [];
  const itemsRaw = Array.isArray(parsed.items) ? parsed.items : [];
  const folders: Array<{ name: string }> = [];
  const folderIndexById = new Map<string, number>();
  for (const folder of foldersRaw) {
    const name = txt(folder?.name);
    if (!name) continue;
    const idx = folders.length;
    folders.push({ name });
    const id = txt(folder?.id);
    if (id) folderIndexById.set(id, idx);
  }

  const ciphers: Array<Record<string, unknown>> = [];
  const folderRelationships: Array<{ key: number; value: number }> = [];
  let hasAnyExplicitFolderLink = false;
  for (const item of itemsRaw) {
    ciphers.push({
      id: item?.id ?? null,
      type: Number(item?.type || 1) || 1,
      name: item?.name ?? 'Untitled',
      notes: item?.notes ?? null,
      favorite: !!item?.favorite,
      reprompt: Number(item?.reprompt ?? 0) || 0,
      key: item?.key ?? null,
      login: item?.login
        ? {
            username: item.login.username ?? null,
            password: item.login.password ?? null,
            totp: item.login.totp ?? null,
            fido2Credentials: Array.isArray(item.login.fido2Credentials) ? item.login.fido2Credentials : null,
            uris: Array.isArray(item.login.uris)
              ? item.login.uris.map((u) => ({ uri: u?.uri ?? null, match: u?.match ?? null }))
              : null,
          }
        : null,
      card: item?.card ?? null,
      identity: item?.identity ?? null,
      secureNote: item?.secureNote ?? null,
      fields: Array.isArray(item?.fields)
        ? item.fields.map((f) => ({
            name: f?.name ?? null,
            value: f?.value ?? null,
            type: Number(f?.type ?? 0) || 0,
            linkedId: f?.linkedId ?? null,
          }))
        : null,
      passwordHistory: Array.isArray(item?.passwordHistory)
        ? item.passwordHistory
            .map((x) => ({ password: x?.password ?? null, lastUsedDate: x?.lastUsedDate ?? null }))
            .filter((x) => !!x.password)
        : null,
      sshKey: item?.sshKey ?? null,
    });
    const folderId = txt(item?.folderId);
    if (!folderId) continue;
    const folderIndex = folderIndexById.get(folderId);
    if (folderIndex !== undefined) {
      hasAnyExplicitFolderLink = true;
      folderRelationships.push({ key: ciphers.length - 1, value: folderIndex });
    }
  }

  // Compatibility fallback:
  // Some exports contain a single folder entry but omit item.folderId on all items.
  // In that malformed shape, users still expect "original path" to place everything
  // into that only folder.
  if (!hasAnyExplicitFolderLink && folders.length === 1 && ciphers.length > 0) {
    for (let i = 0; i < ciphers.length; i++) {
      folderRelationships.push({ key: i, value: 0 });
    }
  }

  return { ciphers, folders, folderRelationships };
}

export function normalizeBitwardenEncryptedAccountImport(raw: BitwardenJsonInput): CiphersImportPayload {
  const itemsRaw = Array.isArray(raw.items) ? raw.items : [];
  const foldersRaw = Array.isArray(raw.folders) ? raw.folders : [];
  if (!Array.isArray(raw.folders) && Array.isArray(raw.collections)) throw new Error('Encrypted organization export is not supported yet.');

  const folders = foldersRaw.map((f) => ({ name: String(f?.name ?? '') }));
  const folderIndexByLegacyId = new Map<string, number>();
  for (let i = 0; i < foldersRaw.length; i++) {
    const folderId = txt(foldersRaw[i]?.id);
    if (folderId) folderIndexByLegacyId.set(folderId, i);
  }
  const ciphers = itemsRaw.map((x) => ({ ...(x as Record<string, unknown>) }));
  const folderRelationships: Array<{ key: number; value: number }> = [];
  for (let i = 0; i < itemsRaw.length; i++) {
    const folderId = txt(itemsRaw[i]?.folderId);
    if (!folderId) continue;
    const folderIndex = folderIndexByLegacyId.get(folderId);
    if (folderIndex !== undefined) folderRelationships.push({ key: i, value: folderIndex });
  }
  return { ciphers, folders, folderRelationships };
}

const IMPORT_SOURCE_PARSERS: Record<ImportSourceId, (textRaw: string) => CiphersImportPayload> = {
  bitwarden_json: () => {
    throw new Error('bitwarden_json is handled by dedicated JSON flow');
  },
  bitwarden_zip: () => {
    throw new Error('bitwarden_zip is handled by dedicated zip flow');
  },
  nodewarden_json: () => {
    throw new Error('nodewarden_json is handled by dedicated JSON flow');
  },
  bitwarden_csv: parseBitwardenCsv,
  onepassword_1pux: parseOnePassword1PuxJson,
  onepassword_1pif: parseOnePassword1Pif,
  onepassword_mac_csv: (textRaw) => parseOnePasswordCsv(textRaw, true),
  onepassword_win_csv: (textRaw) => parseOnePasswordCsv(textRaw, false),
  protonpass_json: parseProtonPassJson,
  avira_csv: parseAviraCsv,
  avast_csv: parseAvastCsv,
  avast_json: parseAvastJson,
  chrome: parseChromeCsv,
  edge: parseChromeCsv,
  brave: parseChromeCsv,
  opera: parseChromeCsv,
  vivaldi: parseChromeCsv,
  firefox_csv: parseFirefoxCsv,
  safari_csv: parseSafariCsv,
  lastpass: parseLastPassCsv,
  dashlane_csv: parseDashlaneCsv,
  dashlane_json: parseDashlaneJson,
  keepass_xml: parseKeePassXml,
  keepassx_csv: parseKeePassXCsv,
  arc_csv: parseArcCsv,
  ascendo_csv: parseAscendoCsv,
  blackberry_csv: parseBlackberryCsv,
  blur_csv: parseBlurCsv,
  buttercup_csv: parseButtercupCsv,
  codebook_csv: parseCodebookCsv,
  encryptr_csv: parseEncryptrCsv,
  enpass_csv: parseEnpassCsv,
  enpass_json: parseEnpassJson,
  keeper_csv: parseKeeperCsv,
  keeper_json: parseKeeperJson,
  logmeonce_csv: parseLogMeOnceCsv,
  meldium_csv: parseMeldiumCsv,
  msecure_csv: parseMSecureCsv,
  myki_csv: parseMykiCsv,
  netwrix_csv: parseNetwrixCsv,
  nordpass_csv: parseNordpassCsv,
  roboform_csv: parseRoboFormCsv,
  zohovault_csv: parseZohoVaultCsv,
  passman_json: parsePassmanJson,
  passky_json: parsePasskyJson,
  psono_json: parsePsonoJson,
  passwordboss_json: parsePasswordBossJson,
};

export function parseImportPayloadBySource(source: ImportSourceId, textRaw: string): CiphersImportPayload {
  return IMPORT_SOURCE_PARSERS[source](textRaw);
}
