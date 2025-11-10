# Content Security Policy (CSP) Configuration

This project uses a Vite plugin to automatically inject the appropriate Content Security Policy based on the environment.

## Overview

The CSP configuration is handled by `vite-plugin-csp.ts` and automatically differentiates between development and production environments.

### Development CSP

In development mode (`npm run dev`), the CSP is more permissive to allow:

- Hot Module Replacement (HMR) via WebSocket
- `unsafe-eval` for Vite's dynamic code execution
- `unsafe-inline` for inline scripts and styles
- Connection to `localhost:8000` (backend API)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self' data:;
connect-src 'self' http://localhost:8000 ws://localhost:5173;
...
```

### Production CSP

In production mode (`npm run build`), the CSP is much stricter:

- **No** `unsafe-eval` or `unsafe-inline` for scripts
- Only allows scripts from same origin
- Restricts API connections to production domain
- Enables `upgrade-insecure-requests` and `block-all-mixed-content`

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self' data:;
connect-src 'self' https://api.ridenbyte.com;
...
```

## Configuration

### Update Production API Domain

Before deploying to production, update the `connect-src` directive in `vite-plugin-csp.ts`:

```typescript
// Production CSP
const prodCSP = [
  // ...
  "connect-src 'self' https://api.ridenbyte.com", // Replace with your API domain
  // ...
].join("; ");
```

### Customizing CSP

To modify the CSP rules:

1. Open `vite-plugin-csp.ts`
2. Edit the `devCSP` or `prodCSP` arrays
3. Restart the dev server or rebuild

### Common CSP Directives

- `default-src`: Fallback for other directives
- `script-src`: Controls JavaScript execution
- `style-src`: Controls CSS sources
- `img-src`: Controls image sources
- `font-src`: Controls font sources
- `connect-src`: Controls AJAX, WebSocket, EventSource
- `media-src`: Controls video/audio sources
- `object-src`: Controls `<object>`, `<embed>`, `<applet>`
- `frame-ancestors`: Controls where the page can be embedded
- `base-uri`: Controls `<base>` element URLs
- `form-action`: Controls form submission targets

## Testing CSP

### Development Testing

```bash
npm run dev
```

Open browser console to check for CSP violations. You should see **no warnings** in development mode.

### Production Testing

```bash
npm run build
npm run preview
```

This builds the production bundle and serves it locally to test the stricter CSP.

## Troubleshooting

### CSP Violation Errors

If you see CSP violations in the console:

1. **In Development**: Check if HMR WebSocket is blocked

   - Solution: Add `ws://localhost:5173` to `connect-src`

2. **Inline Scripts Blocked**:

   - Development: Already allowed via `unsafe-inline`
   - Production: Move inline scripts to external files

3. **External Resources Blocked**:
   - Add the domain to the appropriate directive
   - Example: `img-src 'self' https://cdn.example.com`

### Vite HMR Not Working

If Hot Module Replacement stops working:

- Ensure `ws://localhost:5173` is in development `connect-src`
- Check that `unsafe-eval` is present in development `script-src`

## Security Best Practices

1. **Never use `unsafe-eval` in production** - It defeats XSS protection
2. **Minimize `unsafe-inline` usage** - Use nonces or hashes when possible
3. **Whitelist specific domains** - Avoid wildcards like `https://*`
4. **Test thoroughly** - Build and preview before deploying
5. **Monitor CSP violations** - Use CSP reporting in production

## Resources

- [MDN CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Content Security Policy Reference](https://content-security-policy.com/)
