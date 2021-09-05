var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map, _months, _base, _type, _config;
import AES from "crypto-js/aes.js";
import ENC_UTF8 from "crypto-js/enc-utf8.js";
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function lowercase_keys(obj) {
  const clone = {};
  for (const key in obj) {
    clone[key.toLowerCase()] = obj[key];
  }
  return clone;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name2, thing) {
      params_1.push(name2);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name2 + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name2 + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name2 + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name2 + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name2 = "";
  do {
    name2 = chars[num % chars.length] + name2;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? name2 + "_" : name2;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result2 = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result2 += '\\"';
    } else if (char in escaped$1) {
      result2 += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result2 += char + str[++i];
      } else {
        result2 += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result2 += char;
    }
  }
  result2 += '"';
  return result2;
}
function noop$1() {
}
function safe_not_equal$1(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
const subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue$1.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
const s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data2, fail) {
  try {
    return devalue(data2);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name: name2, message, stack: stack2 } = error2;
    serialized = try_serialize({ ...error2, name: name2, message, stack: stack2 });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
const s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search2 = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search2)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
const escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result2 = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result2 += '\\"';
    } else if (char in escaped$2) {
      result2 += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result2 += char + str[++i];
      } else {
        result2 += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result2 += char;
    }
  }
  result2 += '"';
  return result2;
}
const absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function coalesce_to_error(err) {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let context = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              context,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    context: node_loaded.context,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    });
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
class ReadOnlyFormData {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
}
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data: data2, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data2;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data: data2, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name2, value] = raw_header.split(": ");
      name2 = name2.toLowerCase();
      headers[name2] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name3, value2] = raw_directive.split("=");
        directives[name3] = JSON.parse(value2);
      });
      if (name2 === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data2;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store2, ...callbacks) {
  if (store2 == null) {
    return noop;
  }
  const unsub = store2.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store2) {
  let value;
  subscribe(store2, (_) => value = _)();
  return value;
}
function compute_rest_props(props, keys2) {
  const rest = {};
  keys2 = new Set(keys2);
  for (const k in props)
    if (!keys2.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result2 = {};
  for (const key in slots) {
    result2[key] = true;
  }
  return result2;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
Promise.resolve();
const boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name2) => {
    if (invalid_attribute_name_character.test(name2))
      return;
    const value = attributes[name2];
    if (value === true)
      str += " " + name2;
    else if (boolean_attributes.has(name2.toLowerCase())) {
      if (value)
        str += " " + name2;
    } else if (value != null) {
      str += ` ${name2}="${value}"`;
    }
  });
  return str;
}
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result2 = {};
  for (const key in obj) {
    result2[key] = escape_attribute_value(obj[key]);
  }
  return result2;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name2) {
  if (!component || !component.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(`<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result2, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result2, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result2 = { title: "", head: "", css: new Set() };
      const html = $$render(result2, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result2.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result2.title + result2.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name2}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function afterUpdate() {
}
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}";
const css$g = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$g);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
let base = "";
let assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
const template = ({ head, body }) => `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<link rel="icon" href="/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<link rel='stylesheet' href='/shared/global.css'>
	<link rel='stylesheet' href='/shared/g100.css'>

	` + head + '\n\n	<script src="/shared/RoninScript.js"><\/script>\n\n	<style>\n		:root {\n			--primary: #18f;\n			--primary-hl: #07f;\n			--secondary: #7f7f7f;\n			--secondary-hl: #bbb8;\n			--disabled: #999;\n			--disabled-text: #ccc;\n			--danger: #f22;\n			--danger-hl: #f00;\n		}\n	</style>\n</head>\n\n<body xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:relative;">\n	' + body + "\n</body>\n\n</html>";
let options = null;
const default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-c6d1a9ec.js",
      css: [assets + "/_app/assets/start-61d1577b.css"],
      js: [assets + "/_app/start-c6d1a9ec.js", assets + "/_app/chunks/vendor-86e36fb5.js", assets + "/_app/chunks/paths-28a87002.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "body",
    template,
    trailing_slash: "never"
  };
}
const empty = () => ({});
const manifest = {
  assets: [{ "file": ".nojekyll", "size": 0, "type": null }, { "file": "CNAME", "size": 14, "type": null }, { "file": "assets/Amos.svg", "size": 406, "type": "image/svg+xml" }, { "file": "assets/doof.m4a", "size": 69931, "type": "audio/mp4" }, { "file": "assets/nebula.png", "size": 31893, "type": "image/png" }, { "file": "assets/repl.html", "size": 647, "type": "text/html" }, { "file": "favicon.ico", "size": 4154, "type": "image/vnd.microsoft.icon" }, { "file": "helpers/codes/codemirror+cobalt.css", "size": 5005, "type": "text/css" }, { "file": "helpers/codes/codemirror.js", "size": 155332, "type": "application/javascript" }, { "file": "helpers/codes/css.js", "size": 24389, "type": "application/javascript" }, { "file": "helpers/codes/js.js", "size": 12892, "type": "application/javascript" }, { "file": "helpers/codes/xml+mixedHtml.js", "size": 10689, "type": "application/javascript" }, { "file": "helpers/notes/checklist+list.js", "size": 31422, "type": "application/javascript" }, { "file": "helpers/notes/editorjs.js", "size": 368441, "type": "application/javascript" }, { "file": "helpers/notes/header+embed.js", "size": 39632, "type": "application/javascript" }, { "file": "helpers/notes/simple-image+link.js", "size": 59293, "type": "application/javascript" }, { "file": "helpers/notes/table+alert.js", "size": 31836, "type": "application/javascript" }, { "file": "icons/Amazon.svg", "size": 3707, "type": "image/svg+xml" }, { "file": "icons/Amos.svg", "size": 441, "type": "image/svg+xml" }, { "file": "icons/Basic.svg", "size": 213, "type": "image/svg+xml" }, { "file": "icons/Frontier.svg", "size": 323, "type": "image/svg+xml" }, { "file": "icons/GitHub.svg", "size": 965, "type": "image/svg+xml" }, { "file": "icons/Netflix.svg", "size": 7148, "type": "image/svg+xml" }, { "file": "icons/Reddit.svg", "size": 1837, "type": "image/svg+xml" }, { "file": "icons/Web.svg", "size": 2474, "type": "image/svg+xml" }, { "file": "icons/Webster.svg", "size": 23023, "type": "image/svg+xml" }, { "file": "icons/Wikipedia.svg", "size": 2397, "type": "image/svg+xml" }, { "file": "icons/Youtube.svg", "size": 373, "type": "image/svg+xml" }, { "file": "robots.txt", "size": 67, "type": "text/plain" }, { "file": "shared/RoninScript.js", "size": 4400, "type": "application/javascript" }, { "file": "shared/g100.css", "size": 530489, "type": "text/css" }, { "file": "shared/global.css", "size": 1768, "type": "text/css" }, { "file": "shared/global.scss", "size": 2113, "type": "text/x-scss" }],
  layout: ".svelte-kit/build/components/layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/command\/suggestion\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/command/suggestion.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/command\/samurai\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return samurai;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/command\/data\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return data;
      })
    },
    {
      type: "page",
      pattern: /^\/command\/til\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/command/til.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/monitor\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/monitor/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/monitor\/components\/functions\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return functions$2;
      })
    },
    {
      type: "page",
      pattern: /^\/monitor\/components\/test\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/monitor/components/test.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/monitor\/checker\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return checker;
      })
    },
    {
      type: "page",
      pattern: /^\/monitor\/summary\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/monitor/summary.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/monitor\/chkdsk\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/monitor/chkdsk.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/monitor\/sumbox\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/monitor/sumbox.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/monitor\/show\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/monitor/show.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/stream\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stream/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/stream\/components\/NB_subs\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stream/components/NB_subs.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/stream\/components\/YT_subs\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stream/components/YT_subs.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/stream\/components\/player\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stream/components/player.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/stream\/components\/search\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stream/components/search.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/stream\/components\/bar\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stream/components/bar.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/stream\/shared\/videoCard\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stream/shared/videoCard.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/stream\/shared\/store\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return store$1;
      })
    },
    {
      type: "page",
      pattern: /^\/debug\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/debug/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/debug\/functions\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return functions$1;
      })
    },
    {
      type: "page",
      pattern: /^\/notes\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/notes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/notes\/components\/editor\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/notes/components/editor.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/notes\/components\/store\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return store;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/notes\/components\/api\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return api;
      })
    },
    {
      type: "page",
      pattern: /^\/stack\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stack/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/stack\/functions\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return functions;
      })
    },
    {
      type: "page",
      pattern: /^\/stack\/adder\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stack/adder.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/stack\/stack\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return stack;
      })
    },
    {
      type: "page",
      pattern: /^\/stack\/tile\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/stack/tile.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/time\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/time.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
const get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
const module_lookup = {
  ".svelte-kit/build/components/layout.svelte": () => Promise.resolve().then(function() {
    return layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$5;
  }),
  "src/routes/command/suggestion.svelte": () => Promise.resolve().then(function() {
    return suggestion;
  }),
  "src/routes/command/til.svelte": () => Promise.resolve().then(function() {
    return til;
  }),
  "src/routes/monitor/index.svelte": () => Promise.resolve().then(function() {
    return index$4;
  }),
  "src/routes/monitor/components/test.svelte": () => Promise.resolve().then(function() {
    return test;
  }),
  "src/routes/monitor/summary.svelte": () => Promise.resolve().then(function() {
    return summary;
  }),
  "src/routes/monitor/chkdsk.svelte": () => Promise.resolve().then(function() {
    return chkdsk;
  }),
  "src/routes/monitor/sumbox.svelte": () => Promise.resolve().then(function() {
    return sumbox;
  }),
  "src/routes/monitor/show.svelte": () => Promise.resolve().then(function() {
    return show;
  }),
  "src/routes/stream/index.svelte": () => Promise.resolve().then(function() {
    return index$3;
  }),
  "src/routes/stream/components/NB_subs.svelte": () => Promise.resolve().then(function() {
    return NB_subs$1;
  }),
  "src/routes/stream/components/YT_subs.svelte": () => Promise.resolve().then(function() {
    return YT_subs$1;
  }),
  "src/routes/stream/components/player.svelte": () => Promise.resolve().then(function() {
    return player;
  }),
  "src/routes/stream/components/search.svelte": () => Promise.resolve().then(function() {
    return search;
  }),
  "src/routes/stream/components/bar.svelte": () => Promise.resolve().then(function() {
    return bar;
  }),
  "src/routes/stream/shared/videoCard.svelte": () => Promise.resolve().then(function() {
    return videoCard;
  }),
  "src/routes/debug/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/notes/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/notes/components/editor.svelte": () => Promise.resolve().then(function() {
    return editor$1;
  }),
  "src/routes/stack/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/stack/adder.svelte": () => Promise.resolve().then(function() {
    return adder;
  }),
  "src/routes/stack/tile.svelte": () => Promise.resolve().then(function() {
    return tile;
  }),
  "src/routes/time.svelte": () => Promise.resolve().then(function() {
    return time;
  })
};
const metadata_lookup = { ".svelte-kit/build/components/layout.svelte": { "entry": "layout.svelte-0ba0556b.js", "css": [], "js": ["layout.svelte-0ba0556b.js", "chunks/vendor-86e36fb5.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-932cf0e3.js", "css": [], "js": ["error.svelte-932cf0e3.js", "chunks/vendor-86e36fb5.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-d730202f.js", "css": ["assets/pages/index.svelte-728f4d81.css", "assets/pages/command/suggestion.svelte-d212930c.css"], "js": ["pages/index.svelte-d730202f.js", "chunks/vendor-86e36fb5.js", "chunks/paths-28a87002.js", "chunks/samurai-446ebfd8.js", "chunks/TextInput-d2a5af56.js", "pages/command/til.svelte-7acb1e73.js", "chunks/ClickableTile-f11026d0.js", "pages/command/suggestion.svelte-927ff759.js", "chunks/Tile-ee89b887.js"], "styles": [] }, "src/routes/command/suggestion.svelte": { "entry": "pages/command/suggestion.svelte-927ff759.js", "css": ["assets/pages/command/suggestion.svelte-d212930c.css"], "js": ["pages/command/suggestion.svelte-927ff759.js", "chunks/vendor-86e36fb5.js", "chunks/samurai-446ebfd8.js", "chunks/paths-28a87002.js", "chunks/Tile-ee89b887.js"], "styles": [] }, "src/routes/command/til.svelte": { "entry": "pages/command/til.svelte-7acb1e73.js", "css": [], "js": ["pages/command/til.svelte-7acb1e73.js", "chunks/vendor-86e36fb5.js", "chunks/ClickableTile-f11026d0.js"], "styles": [] }, "src/routes/monitor/index.svelte": { "entry": "pages/monitor/index.svelte-d067201b.js", "css": ["assets/show.svelte_svelte&type=style&lang-9865a76a.css", "assets/pages/monitor/summary.svelte-d79f5507.css"], "js": ["pages/monitor/index.svelte-d067201b.js", "chunks/vendor-86e36fb5.js", "chunks/Tile-ee89b887.js", "pages/monitor/chkdsk.svelte-37a18cd9.js", "pages/monitor/components/test.svelte-d975ad79.js", "chunks/samurai-446ebfd8.js", "chunks/paths-28a87002.js", "chunks/functions-6e510b88.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js", "pages/monitor/summary.svelte-875817ba.js", "chunks/functions-1f887d0c.js"], "styles": [] }, "src/routes/monitor/components/test.svelte": { "entry": "pages/monitor/components/test.svelte-d975ad79.js", "css": [], "js": ["pages/monitor/components/test.svelte-d975ad79.js", "chunks/vendor-86e36fb5.js"], "styles": [] }, "src/routes/monitor/summary.svelte": { "entry": "pages/monitor/summary.svelte-875817ba.js", "css": ["assets/pages/monitor/summary.svelte-d79f5507.css"], "js": ["pages/monitor/summary.svelte-875817ba.js", "chunks/vendor-86e36fb5.js", "chunks/functions-1f887d0c.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/monitor/chkdsk.svelte": { "entry": "pages/monitor/chkdsk.svelte-37a18cd9.js", "css": [], "js": ["pages/monitor/chkdsk.svelte-37a18cd9.js", "chunks/vendor-86e36fb5.js", "pages/monitor/components/test.svelte-d975ad79.js", "chunks/samurai-446ebfd8.js", "chunks/paths-28a87002.js", "chunks/functions-6e510b88.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/monitor/sumbox.svelte": { "entry": "pages/monitor/sumbox.svelte-c3fb34a1.js", "css": ["assets/pages/monitor/sumbox.svelte-1cd0f4ed.css"], "js": ["pages/monitor/sumbox.svelte-c3fb34a1.js", "chunks/vendor-86e36fb5.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/monitor/show.svelte": { "entry": "pages/monitor/show.svelte-a2c71fd6.js", "css": ["assets/show.svelte_svelte&type=style&lang-9865a76a.css"], "js": ["pages/monitor/show.svelte-a2c71fd6.js", "chunks/vendor-86e36fb5.js", "chunks/functions-1f887d0c.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/stream/index.svelte": { "entry": "pages/stream/index.svelte-65a0a95a.js", "css": ["assets/pages/stream/index.svelte-a3380a03.css", "assets/pages/stream/components/bar.svelte-d3551018.css", "assets/pages/stream/shared/videoCard.svelte-e1635625.css", "assets/pages/stream/components/search.svelte-b5dab9be.css"], "js": ["pages/stream/index.svelte-65a0a95a.js", "chunks/vendor-86e36fb5.js", "pages/stream/components/bar.svelte-78f549ee.js", "chunks/TextInput-d2a5af56.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js", "pages/stream/components/player.svelte-e47fa45d.js", "chunks/AspectRatio-277d6531.js", "pages/stream/components/YT_subs.svelte-819eb352.js", "pages/stream/shared/videoCard.svelte-ba7be527.js", "chunks/Slider-3a338e64.js", "pages/stream/components/NB_subs.svelte-116d68f5.js", "pages/stream/components/search.svelte-7bfaa49d.js"], "styles": [] }, "src/routes/stream/components/NB_subs.svelte": { "entry": "pages/stream/components/NB_subs.svelte-116d68f5.js", "css": ["assets/pages/stream/shared/videoCard.svelte-e1635625.css"], "js": ["pages/stream/components/NB_subs.svelte-116d68f5.js", "chunks/vendor-86e36fb5.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js", "chunks/Slider-3a338e64.js", "pages/stream/shared/videoCard.svelte-ba7be527.js", "chunks/AspectRatio-277d6531.js"], "styles": [] }, "src/routes/stream/components/YT_subs.svelte": { "entry": "pages/stream/components/YT_subs.svelte-819eb352.js", "css": ["assets/pages/stream/shared/videoCard.svelte-e1635625.css"], "js": ["pages/stream/components/YT_subs.svelte-819eb352.js", "chunks/vendor-86e36fb5.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js", "pages/stream/shared/videoCard.svelte-ba7be527.js", "chunks/AspectRatio-277d6531.js", "chunks/Slider-3a338e64.js"], "styles": [] }, "src/routes/stream/components/player.svelte": { "entry": "pages/stream/components/player.svelte-e47fa45d.js", "css": [], "js": ["pages/stream/components/player.svelte-e47fa45d.js", "chunks/vendor-86e36fb5.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js", "chunks/AspectRatio-277d6531.js"], "styles": [] }, "src/routes/stream/components/search.svelte": { "entry": "pages/stream/components/search.svelte-7bfaa49d.js", "css": ["assets/pages/stream/components/search.svelte-b5dab9be.css", "assets/pages/stream/shared/videoCard.svelte-e1635625.css"], "js": ["pages/stream/components/search.svelte-7bfaa49d.js", "chunks/vendor-86e36fb5.js", "pages/stream/shared/videoCard.svelte-ba7be527.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js", "chunks/AspectRatio-277d6531.js"], "styles": [] }, "src/routes/stream/components/bar.svelte": { "entry": "pages/stream/components/bar.svelte-78f549ee.js", "css": ["assets/pages/stream/components/bar.svelte-d3551018.css"], "js": ["pages/stream/components/bar.svelte-78f549ee.js", "chunks/vendor-86e36fb5.js", "chunks/TextInput-d2a5af56.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/stream/shared/videoCard.svelte": { "entry": "pages/stream/shared/videoCard.svelte-ba7be527.js", "css": ["assets/pages/stream/shared/videoCard.svelte-e1635625.css"], "js": ["pages/stream/shared/videoCard.svelte-ba7be527.js", "chunks/vendor-86e36fb5.js", "chunks/store-3594ff1c.js", "chunks/client_keys-40eee54c.js", "chunks/molecular-c58642ff.js", "chunks/AspectRatio-277d6531.js"], "styles": [] }, "src/routes/debug/index.svelte": { "entry": "pages/debug/index.svelte-3603ad69.js", "css": ["assets/pages/debug/index.svelte-10b5048b.css"], "js": ["pages/debug/index.svelte-3603ad69.js", "chunks/vendor-86e36fb5.js", "chunks/functions-6e510b88.js", "chunks/paths-28a87002.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/notes/index.svelte": { "entry": "pages/notes/index.svelte-e72d6443.js", "css": ["assets/pages/notes/index.svelte-b40526d2.css", "assets/pages/notes/components/editor.svelte-5015938d.css"], "js": ["pages/notes/index.svelte-e72d6443.js", "chunks/vendor-86e36fb5.js", "pages/notes/components/editor.svelte-cf41144d.js", "chunks/paths-28a87002.js", "chunks/molecular-c58642ff.js", "chunks/client_keys-40eee54c.js"], "styles": [] }, "src/routes/notes/components/editor.svelte": { "entry": "pages/notes/components/editor.svelte-cf41144d.js", "css": ["assets/pages/notes/components/editor.svelte-5015938d.css"], "js": ["pages/notes/components/editor.svelte-cf41144d.js", "chunks/vendor-86e36fb5.js"], "styles": [] }, "src/routes/stack/index.svelte": { "entry": "pages/stack/index.svelte-ecd46c7e.js", "css": ["assets/pages/stack/tile.svelte-b028ea67.css", "assets/pages/stack/adder.svelte-5a16bbd4.css"], "js": ["pages/stack/index.svelte-ecd46c7e.js", "chunks/vendor-86e36fb5.js", "pages/stack/tile.svelte-b169df12.js", "chunks/ClickableTile-f11026d0.js", "pages/stack/adder.svelte-fe1f12eb.js", "chunks/TextInput-d2a5af56.js", "chunks/Tile-ee89b887.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/stack/adder.svelte": { "entry": "pages/stack/adder.svelte-fe1f12eb.js", "css": ["assets/pages/stack/adder.svelte-5a16bbd4.css"], "js": ["pages/stack/adder.svelte-fe1f12eb.js", "chunks/vendor-86e36fb5.js", "chunks/TextInput-d2a5af56.js", "chunks/Tile-ee89b887.js", "chunks/molecular-c58642ff.js"], "styles": [] }, "src/routes/stack/tile.svelte": { "entry": "pages/stack/tile.svelte-b169df12.js", "css": ["assets/pages/stack/tile.svelte-b028ea67.css"], "js": ["pages/stack/tile.svelte-b169df12.js", "chunks/vendor-86e36fb5.js", "chunks/ClickableTile-f11026d0.js"], "styles": [] }, "src/routes/time.svelte": { "entry": "pages/time.svelte-ad97c10e.js", "css": ["assets/pages/time.svelte-482426ad.css"], "js": ["pages/time.svelte-ad97c10e.js", "chunks/vendor-86e36fb5.js", "chunks/molecular-c58642ff.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const sites = JSON.parse(`{
    "nf":{"name":"Netflix","prelink":"https://netflix.com/search?q="},
    "git":{"name":"GitHub","prelink":"https://github.com/search?&q="},
    "s":{"name":"Amos","prelink":"https://google.com/search?q="},
    "qi":{"name":"Amos","prelink":"https://google.com/search?q=","postlink":"&tbm=isch"},
    "r":{"name":"Reddit","base":"https://reddit.com/","prelink":"https://reddit.com/search?q="},
    "y":{"name":"Youtube","prelink":"/stream?q="},
    "fr":{"name":"Frontier","prelink":"https://frontier.nukes.in/search?query="},
    "dict":{"name":"Webster","prelink":"https://www.merriam-webster.com/dictionary/"},
    "wiki":{"name":"Wikipedia","prelink":"https://en.wikipedia.org/wiki/Special:Search?search="}
}`);
const quickPages = JSON.parse(`{
    "wa": { "url": "https://web.whatsapp.com/" },
    "notes": { "url": "${base}/notes" },"note": { "url": "${base}/notes" },
    "news": { "url": "${base}/social" },
    "yt": { "url": "${base}/stream" },"nebula": { "url": "${base}/stream" },"video": { "url": "${base}/stream" },
    "cal": { "url": "${base}/calendar" },
    "mon": { "url": "${base}/monitor" },
    "debug": { "url": "${base}/debug" },"w3": { "url": "${base}/debug" },"repl": { "url": "${base}/debug" }
}`);
var data = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  sites,
  quickPages
});
const recommendations = writable([]);
const suggestions = (SIn) => fetch(`https://api.nukes.in/quick/suggest?q=${SIn}`).then((r) => r.json()).then((r) => recommendations.set(r)).catch(console.warn);
const setEngineImage = (key) => {
  var _a;
  const engineImage = \u0192("#engineImage");
  if (engineImage)
    engineImage.src = `${base}/icons/${((_a = sites[key]) == null ? void 0 : _a.name) || key}.svg`;
};
const engine = (input) => {
  var _a;
  let out = quickPages[input] || null;
  if (out)
    return out;
  if (input.charAt(0) === "!") {
    let withBang = input.replace("!", ""), key = (_a = withBang.split(" ")[0]) == null ? void 0 : _a.toLowerCase(), query = withBang.replace(key + " ", "");
    if (sites.hasOwnProperty(key)) {
      setEngineImage(key);
      suggestions(query || "");
      return {
        key,
        query,
        url: sites[key].prelink + encodeURIComponent(query) + (sites[key].postlink || "")
      };
    }
  } else {
    suggestions(input);
    setEngineImage("Basic");
    return {
      key: "s",
      query: input,
      url: sites["s"].prelink + encodeURIComponent(input) + (sites["s"].postlink || "")
    };
  }
};
const siteFunctions = {
  r: (q, url) => {
    if (q.charAt(0) === "/")
      return sites.r.base + "r" + q;
    else
      return url;
  },
  y: (q, url) => {
    if (q.charAt(0) === "@")
      return sites.y.prelink + "&id=" + q.replace("@", "");
    else
      return url;
  }
};
const preprocessor = ({ key, query, url }) => {
  if (siteFunctions.hasOwnProperty(key))
    return siteFunctions[key](query, url);
  else
    return url;
};
var samurai = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  recommendations,
  engine,
  preprocessor
});
const serverURL = "https://ronin.host:1872";
const cloudURL = "https://api.nukes.in";
class Kron extends Date {
  constructor() {
    super(...arguments);
    __privateAdd(this, _months, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
  }
  timeSince(val = this.getTime()) {
    val = 0 | (Date.now() - new Date(val)) / 1e3;
    let unit, length = {
      second: 60,
      minute: 60,
      hour: 24,
      day: 7,
      week: 4.35,
      month: 12,
      year: 1e4
    }, result2;
    for (unit in length) {
      result2 = val % length[unit];
      if (!(val = 0 | val / length[unit]))
        return result2 + " " + (result2 - 1 ? unit + "s" : unit);
    }
  }
  toLocal(loc = "en-GB") {
    return new Date(this.getTime() || new Date()).toLocaleDateString(loc, {
      weekday: "short",
      day: "numeric",
      hour12: false,
      hour: "2-digit",
      month: "short",
      minute: "2-digit"
    });
  }
  secondsToClock(seconds) {
    return [3600, 60].reduceRight((p, b) => (r) => [Math.floor(r / b)].concat(p(r % b)), (r) => [r])(seconds).map((a) => a.toString().padStart(2, "0")).join(":");
  }
  clockToSeconds(hhmmss) {
    const span = hhmmss.split(":");
    const duration2 = +span[0] * 3600 + +span[1] * 60 + +span[2];
    return duration2;
  }
}
_months = new WeakMap();
class Riquest {
  constructor(base_url, type, config) {
    __privateAdd(this, _base, void 0);
    __privateAdd(this, _type, void 0);
    __privateAdd(this, _config, void 0);
    __publicField(this, "change_type", (type) => __privateSet(this, _type, type || "json"));
    __publicField(this, "handleError", (e) => console.warn(e));
    __privateSet(this, _base, base_url);
    __privateSet(this, _type, type || "json");
    __privateSet(this, _config, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: (config == null ? void 0 : config.identity) === "anonymous" ? "no-referrer" : "strict-origin-when-cross-origin"
    });
  }
  async response_processor(response) {
    const { headers } = response;
    const contentType = headers.get("content-type") || "";
    if (contentType.includes("application/json"))
      return await response.json();
    else
      return await response.text();
  }
  data_processor(data2) {
    let temp;
    if (typeof data2 === "object")
      temp = JSON.stringify(data2);
    if (typeof data2 === "string")
      temp = data2;
    __privateGet(this, _config).body = temp;
  }
  async requester(endpoint = "") {
    let response = await fetch(__privateGet(this, _base) + endpoint, __privateGet(this, _config)).catch(this.handleError);
    if (response && !response.ok)
      return `An ${response.status} has occured on: ${__privateGet(this, _config).method}`;
    if (!response)
      return "Request Failed";
    const processed = await this.response_processor(response);
    if (__privateGet(this, _config).body)
      delete __privateGet(this, _config).body;
    return processed;
  }
  async get(endpoint) {
    __privateGet(this, _config).method = "GET";
    if (__privateGet(this, _config).body)
      delete __privateGet(this, _config).body;
    return await this.requester(endpoint);
  }
  async post(endpoint, data2) {
    __privateGet(this, _config).method = "POST";
    if (data2)
      this.data_processor(data2);
    return await this.requester(endpoint);
  }
  async delete(endpoint, data2) {
    __privateGet(this, _config).method = "DELETE";
    if (data2)
      this.data_processor(data2);
    return await this.requester(endpoint);
  }
  async put(endpoint, data2) {
    __privateGet(this, _config).method = "PUT";
    if (data2)
      this.data_processor(data2);
    return await this.requester(endpoint);
  }
  async patch(endpoint, data2) {
    __privateGet(this, _config).method = "PATCH";
    if (data2)
      this.data_processor(data2);
    return await this.requester(endpoint);
  }
}
_base = new WeakMap();
_type = new WeakMap();
_config = new WeakMap();
const co2Filter = (e) => {
  return {
    now: e.dateRequested,
    source: e.DataSource,
    desc: e.Description,
    updated: e.LastUpdateLocalDateDisplay,
    current: {
      value: e.CurrentIndexValue,
      measured: new Date(e.CurrentIndexValueDate).toLocaleString("en-GB")
    },
    previous: {
      value: e.PerviousIndexValue,
      measured: new Date(e.PerviousIndexValueDate).toLocaleString("en-GB")
    },
    change: {
      value: e.IndexValueChange.toFixed(2),
      percentage: e.IndexValueChangePercent.toFixed(2) + "%"
    }
  };
};
const getCo2 = async () => {
  const request = new Riquest("https://charting.numberlens.com/api/teamearth/getdailyco2?authtoken=D43026302F294A5784F7512A8969FE37", "json");
  const raw = await request.get("");
  return co2Filter(raw);
};
const getShows = async (filtered_list) => {
  const shows_promises = filtered_list.map((e) => fetch("http://api.tvmaze.com/singlesearch/shows?q=" + e.name));
  const shows_data = await Promise.all(shows_promises).then(async (res) => Promise.all(res.map(async (data2) => await data2.json())));
  const last_episode_promises = shows_data.map((e) => {
    var _a, _b;
    console.log(e["_links"]);
    return fetch((_b = (_a = e["_links"]) == null ? void 0 : _a.previousepisode) == null ? void 0 : _b.href.replace("http:", "https:"));
  });
  const last_episode_data = await Promise.all(last_episode_promises).then(async (res) => Promise.all(res.map(async (data2) => await data2.json())));
  const reduced_episode_data = last_episode_data.map((r, i) => {
    var _a, _b;
    return {
      key: i,
      name: filtered_list[i].name,
      last_seen: +new Date(filtered_list[i].day) + 864e5,
      airstamp: +new Date(r.airstamp),
      ep: r.name,
      abt: r.summary || "No Description Available",
      image: ((_a = r.image) == null ? void 0 : _a.original) || ((_b = shows_data[i].image) == null ? void 0 : _b.original)
    };
  }).filter((r, i) => r.last_seen < r.airstamp ? 1 : 0);
  return reduced_episode_data;
};
var functions$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  getCo2,
  getShows
});
const name = "Ronin";
const build = {
  current: 0,
  previous: 15,
  version: "7.0.0"
};
const time$1 = 1630862326499;
var metadata = {
  name,
  build,
  time: time$1
};
const w3 = `<style>
body{
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
h1{
    font: lighter 32px Helvetica;
    color: #f42;
}
</style>
<h1>This is a REPL!</h1>
<script>
    h1 = document.querySelector('h1');
    number = [ 1 || "One" ];
<\/script>`;
const debounce$1 = function(func, wait, immediate) {
  let timeout;
  return () => {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
  };
};
const wordCount = (str) => str.replace(/(^\s*)|(\s*$)/gi, "").replace(/[ ]{2,}/gi, " ").replace(/\n /, "\n").split(" ").length;
const initialize = () => {
  let scrip = document.createElement("script");
  scrip.innerText = `editor = CodeMirror.fromTextArea(document.getElementById("code"), {lineNumbers: true,mode: "htmlmixed",lineWrapping: true,matchBrackets: true});editor.setSize("h-50", "100%");editor.setOption("theme", "cobalt");`;
  document.head.appendChild(scrip);
};
var functions$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  w3,
  debounce: debounce$1,
  wordCount,
  initialize
});
const keys = {
  AES_KEY: "Punam@2601",
  YT_KEY: "AIzaSyDFZfyjFBWARwcMJp1aGxwV5HxXADV25H8"
};
var cnls = [
  {
    name: "3Blue1Brown",
    id: "UCYO_jab_esuFRV4b17AJtAw"
  },
  {
    name: "Atomic Frontier",
    id: "UCbCq5Y0WPGimG2jNXhoQxGw"
  },
  {
    name: "PBS Space Time",
    id: "UC7_gcs09iThXybpVgjHZ_7g"
  },
  {
    name: "Minute Earth",
    id: "UCeiYXex_fwgYDonaTcSIk6w"
  },
  {
    name: "Paolo fromTOKYO",
    id: "UCixD9UbKvDxzGNiPC_fgHyA"
  },
  {
    name: "Learn Engineering",
    id: "UCqZQJ4600a9wIfMPbYc60OQ"
  },
  {
    name: "PBS Eons",
    id: "UCzR-rom72PHN9Zg7RML9EbA"
  },
  {
    name: "TED-Ed",
    id: "UCsooa4yRKGN_zEE8iknghZA"
  },
  {
    name: "Kurzgesagt \u2013 In a Nutshell",
    id: "UCsXVk37bltHxD1rDPwtNM8Q"
  },
  {
    name: "Casual Navigation",
    id: "UC5_HIscbiDZM0dMX-nCksuA"
  },
  {
    name: "Stand Up Maths",
    id: "UCSju5G2aFaWMqn-_0YBtq5A"
  },
  {
    name: "Top Gear",
    id: "UCjOl2AUblVmg2rA_cRgZkFg"
  },
  {
    name: "History Scope",
    id: "UCYb6v1AlX6prKl83DswM5iw"
  },
  {
    name: "B1M",
    id: "UC6n8I1UDTKP1IWjQMg6_TwA"
  },
  {
    name: "Nobita from Japan",
    id: "UCcIsxujzLRO5qY5f9buahCQ"
  },
  {
    name: "Tom Scott",
    id: "UCBa659QWEk1AI4Tg--mrJ2A"
  },
  {
    name: "Tom Scott 2",
    id: "UCHC4G4X-OR5WkY-IquRGa3Q"
  },
  {
    name: "Numberphile",
    id: "UCoxcjq-8xIDTYp3uz647V5A"
  },
  {
    name: "Computerphile",
    id: "UC9-y-6csu5WGm29I7JiwpnA"
  },
  {
    name: "Donut Media",
    id: "UCL6JmiMXKoXS6bpP1D3bk8g"
  },
  {
    name: "Veritasium",
    id: "UCHnyfMqiRRG1u-2MsSQLbXA"
  },
  {
    name: "Steve Mould",
    id: "UCEIwxahdLz7bap-VDs9h35A"
  },
  {
    name: "Mark Rober",
    id: "UCY1kMZp36IQSyNx_9h4mpCg"
  },
  {
    name: "SmarterEveryDay",
    id: "UC6107grRI4m0o2-emgoDnAA"
  },
  {
    name: "Its okay to be Smart",
    id: "UCH4BNI0-FOK2dMXoFtViWHw"
  },
  {
    name: "SciShow Psych",
    id: "UCUdettijNYvLAm4AixZv4RA"
  },
  {
    name: "OverSimplified",
    id: "UCNIuvl7V8zACPpTmmNIqP2A"
  },
  {
    name: "SciShow",
    id: "UCZYTClx2T1of7BRZ86-8fow"
  },
  {
    name: "SciShow Space",
    id: "UCrMePiHCWG4Vwqv3t7W9EFg"
  },
  {
    name: "Domain of Science",
    id: "UCxqAWLTk1CmBvZFPzeZMd9A"
  },
  {
    name: "Techquickie",
    id: "UC0vBXGSyV14uvJ4hECDOl0Q"
  },
  {
    name: "ColdFusion",
    id: "UC4QZ_LsYcvcq7qOsOhpAX4A"
  },
  {
    name: "Think Twice",
    id: "UC9yt3wz-6j19RwD5m5f6HSg"
  },
  {
    name: "Business Casual",
    id: "UC_E4px0RST-qFwXLJWBav8Q"
  },
  {
    name: "Mathologer",
    id: "UC1_uAIS3r8Vu6JjXWvastJg"
  },
  {
    name: "Desitny",
    id: "UCIFtADcWrOApqrsinzPoOfA"
  },
  {
    name: "60 Symbols",
    id: "UCvBqzzvUBLCs8Y7Axb-jZew"
  },
  {
    name: "NileRed",
    id: "UCFhXFikryT4aFcLkLw2LBLA"
  },
  {
    name: "Bill Gates",
    id: "UCnEiGCE13SUI7ZvojTAVBKw"
  },
  {
    name: "NASA Goddard",
    id: "UCAY-SMFNfynqz1bdoaV8BeQ"
  },
  {
    name: "Looking Glass Universe",
    id: "UCFk__1iexL3T5gvGcMpeHNA"
  },
  {
    name: "Seeker",
    id: "UCzWQYUVCpZqtN93H8RR44Qw"
  },
  {
    name: "Jordan Peterson",
    id: "UCL_f53ZEJxp8TtlOkHwMV9Q"
  },
  {
    name: "Quanta Magazine",
    id: "UCTpmmkp1E4nmZqWPS-dl5bg"
  },
  {
    name: "LiveOverflow",
    id: "UClcE-kVhqyiHCcjYwcpfj9w"
  },
  {
    name: "Linfamy",
    id: "UCBkqDNqao03ldC3u78-Pp8g"
  },
  {
    name: "TechLinked",
    id: "UCeeFfhMcJa1kjtfZAGskOCA"
  },
  {
    name: "Scientia Plus",
    id: "UC6_clxPYNS_BstewLKjyA9g"
  },
  {
    name: "NASA JPL",
    id: "UCryGec9PdUCLjpJW2mgCuLw"
  },
  {
    name: "Physics Girl",
    id: "UC7DdEm33SyaTDtWYGO2CwdA"
  }
];
const nb_req = new Riquest(cloudURL, "json");
const yt_req = new Riquest("https://youtube.googleapis.com/youtube/v3", "json");
const YT_KEY = keys.YT_KEY;
const subscriptions = writable([]);
const vId = writable("");
const substack = writable([]);
const YT = "https://youtube.googleapis.com/youtube/v3/";
const search$1 = (q) => yt_req.get(`/search?part=snippet&key=${YT_KEY}&q=${q}&type=video&maxResults=10`);
const nebula = async () => {
  const videos = await nb_req.get("/nebula/subs");
  subscriptions.set(videos);
  return 0;
};
const videoProcessor = (type, slug, tok) => {
  if (!get\u00B5().id) {
    set\u00B5("id", slug);
    set\u00B5("type", type);
    set\u00B5("token", tok);
  }
  const [ext, yt] = [
    "?autoplay=1&enablejsapi=1",
    "www.youtube-nocookie.com/embed/"
  ];
  const [prefix, suffix] = [
    "content.watchnebula.com/video/",
    "/iframe/" + (tok || "")
  ];
  let URL2;
  if (type === "Youtube")
    URL2 = yt + slug + ext;
  if (type === "Nebula")
    URL2 = prefix + slug + suffix;
  vId.set("https://" + URL2);
  return 0;
};
const videoSet = (e) => {
  const dataset = e.currentTarget.querySelector("a").dataset;
  videoProcessor(dataset.type, dataset.slug, dataset.token);
  window.scrollTo(0, 0);
  document.title = dataset.title;
};
const playlist = (q, num = 10) => yt_req.get(`/playlistItems?part=snippet&playlistId=${q}&key=${YT_KEY}&maxResults=${num}`);
const getRecents = async (ids) => {
  const link = `/channels?part=snippet%2CcontentDetails&id=${ids.map((el) => el.id).join("%2C")}&key=${YT_KEY}`;
  const json = await yt_req.get(link);
  let videoList = await Promise.all(json.items.map((el) => el.contentDetails.relatedPlaylists.uploads).map(async (plId) => {
    let plist = await playlist(plId + "&order=date", 4);
    return plist.items;
  }));
  const filtered = videoList.flat();
  return filtered;
};
const channels = async () => {
  const size = 49;
  let chanList = new Array(Math.ceil(cnls.length / size));
  for (let i = 0, l = chanList.length; i < l; i++)
    chanList[i] = cnls.splice(0, size);
  chanList.forEach((cList) => {
    getRecents(cList).then((arr) => substack.set([...get_store_value(substack), ...arr || {}]));
  });
  return 0;
};
var store$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  subscriptions,
  vId,
  substack,
  YT,
  search: search$1,
  nebula,
  videoProcessor,
  videoSet,
  channels
});
const result = (pass) => {
  let success = pass;
  success.map((e) => {
    if (!e.check)
      e.check = expect(e.value, e.expect);
  });
  return success;
};
const expect = (expression, value) => expression === value ? 1 : 0;
const command_test = async () => {
  const search_git = engine("!git plutoniumm");
  const search_vanilla = engine("Arbitrary");
  const reddit_check = preprocessor(engine("!r /quantum"));
  return result([
    { name: "Engine Standard", value: search_vanilla.url, expect: "https://google.com/search?q=Arbitrary" },
    { name: "Engine Standard", value: reddit_check, expect: "https://reddit.com/r/quantum" },
    { name: "Engine Bang Check", value: search_git.url, expect: "https://github.com/search?&q=plutoniumm" }
  ]);
};
const debug_test = async () => {
  const statement = "The Quick Brown Fox, Jumped over the lazy dog";
  const count = wordCount(statement);
  return result([
    { name: "Word Count Check", value: count, expect: 9 }
  ]);
};
const stream_test = async () => {
  const response1 = await search$1("despacito");
  const response2 = await search$1("rober squirrel 2.0");
  const search_res1 = JSON.stringify(response1.items);
  const search_res2 = JSON.stringify(response2.items);
  return result([
    { name: "Youtube Search Call1", check: expect(search_res1 == null ? void 0 : search_res1.includes("Fonsi"), true) },
    { name: "Youtube Search Call2", check: expect(search_res2 == null ? void 0 : search_res2.includes("Maze"), true) }
  ]);
};
var checker = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  command_test,
  debug_test,
  stream_test
});
const editorData = writable({ "blocks": [{ "type": "header", "data": { "text": "New Note", "level": 1 } }, { "type": "paragraph", "data": { "text": "Save Something" } }] });
const notesList = writable([]);
const updateEditor = (id, data2) => {
  const mainEditor = \u0192("#editorOfNotes");
  if (!(mainEditor.dataset.id === id)) {
    editor.render(data2);
    mainEditor.setAttribute("data-id", id);
    mainEditor.removeAttribute("data-new");
  }
};
var store = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  editorData,
  notesList,
  updateEditor
});
const reqr = new Riquest(serverURL, "text");
const getNotes = async () => {
  console.log("[Terrelysium] Initialising...");
  const text = await reqr.get("/notes/");
  console.log("[Terrelysium] Initialised.");
  notesList.set(decrypt(text));
  return 0;
};
const getNote = async (id) => {
  const text = await reqr.get("/notes/" + id);
  updateEditor(id, decrypt(text));
  return text;
};
const updateNote = async (id, data2 = null) => {
  let list = get_store_value(notesList);
  const found = list.find((e) => e.id === id);
  if (data2) {
    if (found) {
      found.title = data2.blocks[0].data.text;
      found.date = data2.time;
    } else {
      list.push({ title: data2.blocks[0].data.text, id, date: data2.time });
    }
  } else {
    delete list[found];
    list = list.filter(Boolean);
  }
  notesList.set(list);
  const json = await reqr.patch("/notes/" + id, { note: data2 ? JSON.stringify(data2) : null, list: JSON.stringify(get_store_value(notesList)) });
  return json;
};
const encrypt = (obj, key = keys.AES_KEY) => AES.encrypt(JSON.stringify(obj), key).toString();
const decrypt = (str, key = keys.AES_KEY) => JSON.parse(AES.decrypt(str, key).toString(ENC_UTF8));
var api = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  getNotes,
  getNote,
  updateNote,
  encrypt,
  decrypt
});
const getMetadata = async (url) => {
  const URL2 = serverURL + "/requestMetadata?url=" + encodeURI(url);
  const response = await fetch(URL2);
  const json = await response.json();
  return json;
};
var functions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  getMetadata
});
var orbs = [
  {
    id: "71df707b-6eec-4b21-a0a0-0a3183f0faba",
    url: "https://scientificamerican.com/article/ai-designs-quantum-physics-experiments-beyond-what-any-human-has-conceived/",
    title: "AI does Quantum",
    type: "Article",
    from: "Subscription",
    image: "https://static.scientificamerican.com/sciam/cache/file/0820F6BA-1235-45C5-AD7EB379E058A13C.jpg",
    date: 16251642e5,
    rank: "2"
  },
  {
    id: "c0c40fe5-f9fe-491c-83d1-4c605fef672e",
    url: "https://quantamagazine.org/mathematicians-identify-threshold-at-which-shapes-give-way-20210603/",
    title: "Threshold when Shapes Give Way",
    type: "Article",
    from: "Subscription",
    image: "https://d2r55xnwy6nx47.cloudfront.net/uploads/2021/06/Sphere-Twists_1200_social.gif",
    date: 16226586e5,
    rank: "1"
  },
  {
    id: "6032c4e6-722d-40f1-9bcd-53e42cff118b",
    url: "https://youtube.com/watch?v=XW0QZmtbjvs",
    title: "Lex Fridman Vitalik Buterin",
    type: "Video",
    from: "Auto",
    image: "https://i.ytimg.com/vi/XW0QZmtbjvs/maxresdefault.jpg",
    date: 1622745e6,
    rank: "0"
  },
  {
    id: "81038e38-9c95-4a39-b018-f2b020217192",
    url: "https://github.com/IndiQ-Meetups/Events/tree/main/collaborations/IISc-IEEE-ComSoc/qComm-workshop-2021",
    title: "IEEE Quantum Tuts",
    type: "Repository",
    from: "Email",
    image: "https://opengraph.githubassets.com/0c22db1194bd8b1a313e990f32792c4d8341e8c3d219fc6416b18fe217b00d20/IndiQ-Meetups/Events",
    date: 16307802e5,
    rank: "4"
  },
  {
    id: "694945db-c749-4fad-84bf-211f62ef36d5",
    url: "https://github.com/tensorflow/tfjs-models/tree/master/toxicity",
    title: "Tensorflow Toxicity JS Model",
    type: "Repository",
    from: "Auto",
    image: "https://opengraph.githubassets.com/a874a01b4fd4f611a78761f5658cfd89c4930ce00fa2d14ab083ec89f0d338ef/tensorflow/tfjs-models",
    date: 16273242e5,
    rank: "5"
  },
  {
    id: "3a0fbcae-a376-4752-af6d-7c6bc733dd1f",
    url: "https://github.com/tensorflow/tfjs-models/tree/master/toxicity",
    title: "Brython: Python Web",
    type: "Website",
    from: "Auto",
    image: "https://i.ytimg.com/vi/VJj-H4we71g/maxresdefault.jpg",
    date: 16269786e5,
    rank: "6"
  }
];
var stack = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": orbs
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
var layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
const AspectRatio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ratio"]);
  let { ratio = "2x1" } = $$props;
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  return `<div${spread([escape_object($$restProps)], "bx--aspect-ratio " + (ratio === "2x1" ? "bx--aspect-ratio--2x1" : "") + " " + (ratio === "16x9" ? "bx--aspect-ratio--16x9" : "") + " " + (ratio === "4x3" ? "bx--aspect-ratio--4x3" : "") + " " + (ratio === "1x1" ? "bx--aspect-ratio--1x1" : "") + " " + (ratio === "3x4" ? "bx--aspect-ratio--3x4" : "") + " " + (ratio === "3x2" ? "bx--aspect-ratio--3x2" : "") + " " + (ratio === "9x16" ? "bx--aspect-ratio--9x16" : "") + " " + (ratio === "1x2" ? "bx--aspect-ratio--1x2" : ""))}><div${add_classes(["bx--aspect-ratio--object"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const ButtonSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "size", "small"]);
  let { href = void 0 } = $$props;
  let { size = "default" } = $$props;
  let { small = false } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  return `
${href ? `<a${spread([
    { href: escape_attribute_value(href) },
    {
      rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    { role: "button" },
    escape_object($$restProps)
  ], "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" || small ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : ""))}>${escape("")}</a>` : `<div${spread([escape_object($$restProps)], "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" || small ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : ""))}></div>`}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "size",
    "expressive",
    "isSelected",
    "hasIconOnly",
    "icon",
    "iconDescription",
    "tooltipAlignment",
    "tooltipPosition",
    "as",
    "skeleton",
    "disabled",
    "href",
    "tabindex",
    "type",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { kind = "primary" } = $$props;
  let { size = "default" } = $$props;
  let { expressive = false } = $$props;
  let { isSelected = false } = $$props;
  let { hasIconOnly = false } = $$props;
  let { icon = void 0 } = $$props;
  let { iconDescription = void 0 } = $$props;
  let { tooltipAlignment = "center" } = $$props;
  let { tooltipPosition = "bottom" } = $$props;
  let { as = false } = $$props;
  let { skeleton = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { tabindex = "0" } = $$props;
  let { type = "button" } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("ComposedModal");
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.expressive === void 0 && $$bindings.expressive && expressive !== void 0)
    $$bindings.expressive(expressive);
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.hasIconOnly === void 0 && $$bindings.hasIconOnly && hasIconOnly !== void 0)
    $$bindings.hasIconOnly(hasIconOnly);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef(ref);
    }
  }
  hasIconOnly = icon && !$$slots.default;
  buttonProps = {
    type: href && !disabled ? void 0 : type,
    tabindex,
    disabled: disabled === true ? true : void 0,
    href,
    "aria-pressed": hasIconOnly && kind === "ghost" ? isSelected : void 0,
    ...$$restProps,
    class: [
      "bx--btn",
      expressive && "bx--btn--expressive",
      (size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
      size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
      size === "field" && "bx--btn--field",
      size === "small" && "bx--btn--sm",
      size === "lg" && "bx--btn--lg",
      size === "xl" && "bx--btn--xl",
      kind && `bx--btn--${kind}`,
      disabled && "bx--btn--disabled",
      hasIconOnly && "bx--btn--icon-only",
      hasIconOnly && "bx--tooltip__trigger",
      hasIconOnly && "bx--tooltip--a11y",
      hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
      hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
      hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
      $$restProps.class
    ].filter(Boolean).join(" ")
  };
  return `
${skeleton ? `${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, Object.assign({ href }, { size }, $$restProps, { style: hasIconOnly && "width: 3rem;" }), {}, {})}` : `${as ? `${slots.default ? slots.default({ props: buttonProps }) : ``}` : `${href && !disabled ? `
  <a${spread([escape_object(buttonProps)])}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  }, {}, {})}</a>` : `<button${spread([escape_object(buttonProps)])}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  }, {}, {})}</button>`}`}`}`;
});
const WarningFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "WarningFilled16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"}"></path><path d="${"M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var WarningFilled16$1 = WarningFilled16;
const WarningAltFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "WarningAltFilled16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path fill="${"none"}" d="${"M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z"}" data-icon-path="${"inner-path"}"></path><path d="${"M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"}"></path><path d="${"M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var WarningAltFilled16$1 = WarningAltFilled16;
const ListBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "type",
    "open",
    "light",
    "disabled",
    "invalid",
    "invalidText",
    "warn",
    "warnText"
  ]);
  let { size = void 0 } = $$props;
  let { type = "default" } = $$props;
  let { open = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  return `<div${spread([
    { role: "listbox" },
    { tabindex: "-1" },
    {
      "data-invalid": escape_attribute_value(invalid || void 0)
    },
    escape_object($$restProps)
  ], "bx--list-box " + (size === "sm" ? "bx--list-box--sm" : "") + " " + (size === "xl" ? "bx--list-box--xl" : "") + " " + (type === "inline" ? "bx--list-box--inline" : "") + " " + (disabled ? "bx--list-box--disabled" : "") + " " + (open ? "bx--list-box--expanded" : "") + " " + (light ? "bx--list-box--light" : "") + " " + (!invalid && warn ? "bx--list-box--warning" : ""))}>${slots.default ? slots.default({}) : ``}</div>
${invalid ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
${!invalid && warn ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}`;
});
const ListBoxMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["id", "ref"]);
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<div${spread([{ role: "listbox" }, { id: "menu-" + escape(id) }, escape_object($$restProps)], "bx--list-box__menu")}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ChevronDown16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "ChevronDown16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 16 16" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var ChevronDown16$1 = ChevronDown16;
const ListBoxMenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let description;
  let $$restProps = compute_rest_props($$props, ["open", "translationIds", "translateWithId"]);
  let { open = false } = $$props;
  const translationIds = { close: "close", open: "open" };
  let { translateWithId = (id) => defaultTranslations[id] } = $$props;
  const defaultTranslations = {
    [translationIds.close]: "Close menu",
    [translationIds.open]: "Open menu"
  };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  description = open ? translateWithId("close") : translateWithId("open");
  return `<div${spread([escape_object($$restProps)], "bx--list-box__menu-icon " + (open ? "bx--list-box__menu-icon--open" : ""))}>${validate_component(ChevronDown16$1, "ChevronDown16").$$render($$result, {
    "aria-label": description,
    title: description
  }, {}, {})}</div>`;
});
const ListBoxMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["active", "highlighted"]);
  let { active = false } = $$props;
  let { highlighted = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.highlighted === void 0 && $$bindings.highlighted && highlighted !== void 0)
    $$bindings.highlighted(highlighted);
  return `<div${spread([escape_object($$restProps)], "bx--list-box__menu-item " + (active ? "bx--list-box__menu-item--active" : "") + " " + (highlighted ? "bx--list-box__menu-item--highlighted" : ""))}><div${add_classes(["bx--list-box__menu-item__option"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const HOOKS = [
  "onChange",
  "onClose",
  "onDayCreate",
  "onDestroy",
  "onKeyDown",
  "onMonthChange",
  "onOpen",
  "onParseConfig",
  "onReady",
  "onValueUpdate",
  "onYearChange",
  "onPreCalendarPosition"
];
const defaults = {
  _disable: [],
  allowInput: false,
  allowInvalidPreload: false,
  altFormat: "F j, Y",
  altInput: false,
  altInputClass: "form-control input",
  animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: true,
  clickOpens: true,
  closeOnSelect: true,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: false,
  enableSeconds: false,
  enableTime: false,
  errorHandler: (err) => typeof console !== "undefined" && console.warn(err),
  getWeek: (givenDate) => {
    const date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: false,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: false,
  now: new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: void 0,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: false,
  showMonths: 1,
  static: false,
  time_24hr: false,
  weekNumbers: false,
  wrap: false
};
const english = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    longhand: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: (nth) => {
    const s2 = nth % 100;
    if (s2 > 3 && s2 < 21)
      return "th";
    switch (s2 % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: false
};
const pad = (number, length = 2) => `000${number}`.slice(length * -1);
const int = (bool) => bool === true ? 1 : 0;
function debounce(fn, wait) {
  let t;
  return function() {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), wait);
  };
}
const arrayify = (obj) => obj instanceof Array ? obj : [obj];
function toggleClass(elem, className, bool) {
  if (bool === true)
    return elem.classList.add(className);
  elem.classList.remove(className);
}
function createElement(tag, className, content) {
  const e = window.document.createElement(tag);
  className = className || "";
  content = content || "";
  e.className = className;
  if (content !== void 0)
    e.textContent = content;
  return e;
}
function clearNode(node) {
  while (node.firstChild)
    node.removeChild(node.firstChild);
}
function findParent(node, condition) {
  if (condition(node))
    return node;
  else if (node.parentNode)
    return findParent(node.parentNode, condition);
  return void 0;
}
function createNumberInput(inputClassName, opts) {
  const wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
    numInput.type = "number";
  } else {
    numInput.type = "text";
    numInput.pattern = "\\d*";
  }
  if (opts !== void 0)
    for (const key in opts)
      numInput.setAttribute(key, opts[key]);
  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);
  return wrapper;
}
function getEventTarget(event) {
  try {
    if (typeof event.composedPath === "function") {
      const path = event.composedPath();
      return path[0];
    }
    return event.target;
  } catch (error2) {
    return event.target;
  }
}
const doNothing = () => void 0;
const monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
const revFormat = {
  D: doNothing,
  F: function(dateObj, monthName, locale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  H: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  J: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  K: (dateObj, amPM, locale) => {
    dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
  },
  M: function(dateObj, shortMonth, locale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1e3),
  W: function(dateObj, weekNum, locale) {
    const weekNumber = parseInt(weekNum);
    const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
    return date;
  },
  Y: (dateObj, year) => {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: (_, ISODate) => new Date(ISODate),
  d: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  h: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  i: (dateObj, minutes) => {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
  w: doNothing,
  y: (dateObj, year) => {
    dateObj.setFullYear(2e3 + parseFloat(year));
  }
};
const tokenRegex = {
  D: "(\\w+)",
  F: "(\\w+)",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "(\\w+)",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "(\\w+)",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
};
const formats = {
  Z: (date) => date.toISOString(),
  D: function(date, locale, options2) {
    return locale.weekdays.shorthand[formats.w(date, locale, options2)];
  },
  F: function(date, locale, options2) {
    return monthToStr(formats.n(date, locale, options2) - 1, false, locale);
  },
  G: function(date, locale, options2) {
    return pad(formats.h(date, locale, options2));
  },
  H: (date) => pad(date.getHours()),
  J: function(date, locale) {
    return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
  },
  K: (date, locale) => locale.amPM[int(date.getHours() > 11)],
  M: function(date, locale) {
    return monthToStr(date.getMonth(), true, locale);
  },
  S: (date) => pad(date.getSeconds()),
  U: (date) => date.getTime() / 1e3,
  W: function(date, _, options2) {
    return options2.getWeek(date);
  },
  Y: (date) => pad(date.getFullYear(), 4),
  d: (date) => pad(date.getDate()),
  h: (date) => date.getHours() % 12 ? date.getHours() % 12 : 12,
  i: (date) => pad(date.getMinutes()),
  j: (date) => date.getDate(),
  l: function(date, locale) {
    return locale.weekdays.longhand[date.getDay()];
  },
  m: (date) => pad(date.getMonth() + 1),
  n: (date) => date.getMonth() + 1,
  s: (date) => date.getSeconds(),
  u: (date) => date.getTime(),
  w: (date) => date.getDay(),
  y: (date) => String(date.getFullYear()).substring(2)
};
const createDateFormatter = ({ config = defaults, l10n = english, isMobile = false }) => (dateObj, frmt, overrideLocale) => {
  const locale = overrideLocale || l10n;
  if (config.formatDate !== void 0 && !isMobile) {
    return config.formatDate(dateObj, frmt, locale);
  }
  return frmt.split("").map((c, i, arr) => formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "").join("");
};
const createDateParser = ({ config = defaults, l10n = english }) => (date, givenFormat, timeless, customLocale) => {
  if (date !== 0 && !date)
    return void 0;
  const locale = customLocale || l10n;
  let parsedDate;
  const dateOrig = date;
  if (date instanceof Date)
    parsedDate = new Date(date.getTime());
  else if (typeof date !== "string" && date.toFixed !== void 0)
    parsedDate = new Date(date);
  else if (typeof date === "string") {
    const format = givenFormat || (config || defaults).dateFormat;
    const datestr = String(date).trim();
    if (datestr === "today") {
      parsedDate = new Date();
      timeless = true;
    } else if (/Z$/.test(datestr) || /GMT$/.test(datestr))
      parsedDate = new Date(date);
    else if (config && config.parseDate)
      parsedDate = config.parseDate(date, format);
    else {
      parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
      let matched, ops = [];
      for (let i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
        const token = format[i];
        const isBackSlash = token === "\\";
        const escaped2 = format[i - 1] === "\\" || isBackSlash;
        if (tokenRegex[token] && !escaped2) {
          regexStr += tokenRegex[token];
          const match = new RegExp(regexStr).exec(date);
          if (match && (matched = true)) {
            ops[token !== "Y" ? "push" : "unshift"]({
              fn: revFormat[token],
              val: match[++matchIndex]
            });
          }
        } else if (!isBackSlash)
          regexStr += ".";
        ops.forEach(({ fn, val }) => parsedDate = fn(parsedDate, val, locale) || parsedDate);
      }
      parsedDate = matched ? parsedDate : void 0;
    }
  }
  if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
    config.errorHandler(new Error(`Invalid date provided: ${dateOrig}`));
    return void 0;
  }
  if (timeless === true)
    parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
};
function compareDates(date1, date2, timeless = true) {
  if (timeless !== false) {
    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
  }
  return date1.getTime() - date2.getTime();
}
const isBetween = (ts, ts1, ts2) => {
  return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
const duration = {
  DAY: 864e5
};
function getDefaultHours(config) {
  let hours = config.defaultHour;
  let minutes = config.defaultMinute;
  let seconds = config.defaultSeconds;
  if (config.minDate !== void 0) {
    const minHour = config.minDate.getHours();
    const minMinutes = config.minDate.getMinutes();
    const minSeconds = config.minDate.getSeconds();
    if (hours < minHour) {
      hours = minHour;
    }
    if (hours === minHour && minutes < minMinutes) {
      minutes = minMinutes;
    }
    if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
      seconds = config.minDate.getSeconds();
  }
  if (config.maxDate !== void 0) {
    const maxHr = config.maxDate.getHours();
    const maxMinutes = config.maxDate.getMinutes();
    hours = Math.min(hours, maxHr);
    if (hours === maxHr)
      minutes = Math.min(maxMinutes, minutes);
    if (hours === maxHr && minutes === maxMinutes)
      seconds = config.maxDate.getSeconds();
  }
  return { hours, minutes, seconds };
}
if (typeof Object.assign !== "function") {
  Object.assign = function(target, ...args) {
    if (!target) {
      throw TypeError("Cannot convert undefined or null to object");
    }
    for (const source of args) {
      if (source) {
        Object.keys(source).forEach((key) => target[key] = source[key]);
      }
    }
    return target;
  };
}
const DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
  const self = {
    config: Object.assign(Object.assign({}, defaults), flatpickr.defaultConfig),
    l10n: english
  };
  self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
  self._handlers = [];
  self.pluginElements = [];
  self.loadedPlugins = [];
  self._bind = bind;
  self._setHoursFromDate = setHoursFromDate;
  self._positionCalendar = positionCalendar;
  self.changeMonth = changeMonth;
  self.changeYear = changeYear;
  self.clear = clear;
  self.close = close;
  self._createElement = createElement;
  self.destroy = destroy;
  self.isEnabled = isEnabled;
  self.jumpToDate = jumpToDate;
  self.open = open;
  self.redraw = redraw;
  self.set = set;
  self.setDate = setDate;
  self.toggle = toggle;
  function setupHelperFunctions() {
    self.utils = {
      getDaysInMonth(month = self.currentMonth, yr = self.currentYear) {
        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0))
          return 29;
        return self.l10n.daysInMonth[month];
      }
    };
  }
  function init2() {
    self.element = self.input = element;
    self.isOpen = false;
    parseConfig();
    setupLocale();
    setupInputs();
    setupDates();
    setupHelperFunctions();
    if (!self.isMobile)
      build2();
    bindEvents();
    if (self.selectedDates.length || self.config.noCalendar) {
      if (self.config.enableTime) {
        setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : void 0);
      }
      updateValue(false);
    }
    setCalendarWidth();
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!self.isMobile && isSafari) {
      positionCalendar();
    }
    triggerEvent("onReady");
  }
  function bindToInstance(fn) {
    return fn.bind(self);
  }
  function setCalendarWidth() {
    const config = self.config;
    if (config.weekNumbers === false && config.showMonths === 1) {
      return;
    } else if (config.noCalendar !== true) {
      window.requestAnimationFrame(function() {
        if (self.calendarContainer !== void 0) {
          self.calendarContainer.style.visibility = "hidden";
          self.calendarContainer.style.display = "block";
        }
        if (self.daysContainer !== void 0) {
          const daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
          self.daysContainer.style.width = daysWidth + "px";
          self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== void 0 ? self.weekWrapper.offsetWidth : 0) + "px";
          self.calendarContainer.style.removeProperty("visibility");
          self.calendarContainer.style.removeProperty("display");
        }
      });
    }
  }
  function updateTime(e) {
    if (self.selectedDates.length === 0) {
      const defaultDate = self.config.minDate === void 0 || compareDates(new Date(), self.config.minDate) >= 0 ? new Date() : new Date(self.config.minDate.getTime());
      const defaults2 = getDefaultHours(self.config);
      defaultDate.setHours(defaults2.hours, defaults2.minutes, defaults2.seconds, defaultDate.getMilliseconds());
      self.selectedDates = [defaultDate];
      self.latestSelectedDateObj = defaultDate;
    }
    if (e !== void 0 && e.type !== "blur") {
      timeWrapper(e);
    }
    const prevValue = self._input.value;
    setHoursFromInputs();
    updateValue();
    if (self._input.value !== prevValue) {
      self._debouncedChange();
    }
  }
  function ampm2military(hour, amPM) {
    return hour % 12 + 12 * int(amPM === self.l10n.amPM[1]);
  }
  function military2ampm(hour) {
    switch (hour % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return hour % 12;
    }
  }
  function setHoursFromInputs() {
    if (self.hourElement === void 0 || self.minuteElement === void 0)
      return;
    let hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== void 0 ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
    if (self.amPM !== void 0) {
      hours = ampm2military(hours, self.amPM.textContent);
    }
    const limitMinHours = self.config.minTime !== void 0 || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
    const limitMaxHours = self.config.maxTime !== void 0 || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
    if (limitMaxHours) {
      const maxTime = self.config.maxTime !== void 0 ? self.config.maxTime : self.config.maxDate;
      hours = Math.min(hours, maxTime.getHours());
      if (hours === maxTime.getHours())
        minutes = Math.min(minutes, maxTime.getMinutes());
      if (minutes === maxTime.getMinutes())
        seconds = Math.min(seconds, maxTime.getSeconds());
    }
    if (limitMinHours) {
      const minTime = self.config.minTime !== void 0 ? self.config.minTime : self.config.minDate;
      hours = Math.max(hours, minTime.getHours());
      if (hours === minTime.getHours() && minutes < minTime.getMinutes())
        minutes = minTime.getMinutes();
      if (minutes === minTime.getMinutes())
        seconds = Math.max(seconds, minTime.getSeconds());
    }
    setHours(hours, minutes, seconds);
  }
  function setHoursFromDate(dateObj) {
    const date = dateObj || self.latestSelectedDateObj;
    if (date) {
      setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  function setHours(hours, minutes, seconds) {
    if (self.latestSelectedDateObj !== void 0) {
      self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
    }
    if (!self.hourElement || !self.minuteElement || self.isMobile)
      return;
    self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
    self.minuteElement.value = pad(minutes);
    if (self.amPM !== void 0)
      self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
    if (self.secondElement !== void 0)
      self.secondElement.value = pad(seconds);
  }
  function onYearInput(event) {
    const eventTarget = getEventTarget(event);
    const year = parseInt(eventTarget.value) + (event.delta || 0);
    if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
      changeYear(year);
    }
  }
  function bind(element2, event, handler, options2) {
    if (event instanceof Array)
      return event.forEach((ev) => bind(element2, ev, handler, options2));
    if (element2 instanceof Array)
      return element2.forEach((el) => bind(el, event, handler, options2));
    element2.addEventListener(event, handler, options2);
    self._handlers.push({
      remove: () => element2.removeEventListener(event, handler)
    });
  }
  function triggerChange() {
    triggerEvent("onChange");
  }
  function bindEvents() {
    if (self.config.wrap) {
      ["open", "close", "toggle", "clear"].forEach((evt) => {
        Array.prototype.forEach.call(self.element.querySelectorAll(`[data-${evt}]`), (el) => bind(el, "click", self[evt]));
      });
    }
    if (self.isMobile) {
      setupMobile();
      return;
    }
    const debouncedResize = debounce(onResize, 50);
    self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
    if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
      bind(self.daysContainer, "mouseover", (e) => {
        if (self.config.mode === "range")
          onMouseOver(getEventTarget(e));
      });
    bind(window.document.body, "keydown", onKeyDown);
    if (!self.config.inline && !self.config.static)
      bind(window, "resize", debouncedResize);
    if (window.ontouchstart !== void 0)
      bind(window.document, "touchstart", documentClick);
    else
      bind(window.document, "mousedown", documentClick);
    bind(window.document, "focus", documentClick, { capture: true });
    if (self.config.clickOpens === true) {
      bind(self._input, "focus", self.open);
      bind(self._input, "click", self.open);
    }
    if (self.daysContainer !== void 0) {
      bind(self.monthNav, "click", onMonthNavClick);
      bind(self.monthNav, ["keyup", "increment"], onYearInput);
      bind(self.daysContainer, "click", selectDate);
    }
    if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0) {
      const selText = (e) => getEventTarget(e).select();
      bind(self.timeContainer, ["increment"], updateTime);
      bind(self.timeContainer, "blur", updateTime, { capture: true });
      bind(self.timeContainer, "click", timeIncrement);
      bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
      if (self.secondElement !== void 0)
        bind(self.secondElement, "focus", () => self.secondElement && self.secondElement.select());
      if (self.amPM !== void 0) {
        bind(self.amPM, "click", (e) => {
          updateTime(e);
          triggerChange();
        });
      }
    }
    if (self.config.allowInput) {
      bind(self._input, "blur", onBlur);
    }
  }
  function jumpToDate(jumpDate, triggerChange2) {
    const jumpTo = jumpDate !== void 0 ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
    const oldYear = self.currentYear;
    const oldMonth = self.currentMonth;
    try {
      if (jumpTo !== void 0) {
        self.currentYear = jumpTo.getFullYear();
        self.currentMonth = jumpTo.getMonth();
      }
    } catch (e) {
      e.message = "Invalid date supplied: " + jumpTo;
      self.config.errorHandler(e);
    }
    if (triggerChange2 && self.currentYear !== oldYear) {
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    if (triggerChange2 && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
      triggerEvent("onMonthChange");
    }
    self.redraw();
  }
  function timeIncrement(e) {
    const eventTarget = getEventTarget(e);
    if (~eventTarget.className.indexOf("arrow"))
      incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
  }
  function incrementNumInput(e, delta, inputElem) {
    const target = e && getEventTarget(e);
    const input = inputElem || target && target.parentNode && target.parentNode.firstChild;
    const event = createEvent("increment");
    event.delta = delta;
    input && input.dispatchEvent(event);
  }
  function build2() {
    const fragment = window.document.createDocumentFragment();
    self.calendarContainer = createElement("div", "flatpickr-calendar");
    self.calendarContainer.tabIndex = -1;
    if (!self.config.noCalendar) {
      fragment.appendChild(buildMonthNav());
      self.innerContainer = createElement("div", "flatpickr-innerContainer");
      if (self.config.weekNumbers) {
        const { weekWrapper, weekNumbers } = buildWeeks();
        self.innerContainer.appendChild(weekWrapper);
        self.weekNumbers = weekNumbers;
        self.weekWrapper = weekWrapper;
      }
      self.rContainer = createElement("div", "flatpickr-rContainer");
      self.rContainer.appendChild(buildWeekdays());
      if (!self.daysContainer) {
        self.daysContainer = createElement("div", "flatpickr-days");
        self.daysContainer.tabIndex = -1;
      }
      buildDays();
      self.rContainer.appendChild(self.daysContainer);
      self.innerContainer.appendChild(self.rContainer);
      fragment.appendChild(self.innerContainer);
    }
    if (self.config.enableTime) {
      fragment.appendChild(buildTime());
    }
    toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
    toggleClass(self.calendarContainer, "animate", self.config.animate === true);
    toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
    self.calendarContainer.appendChild(fragment);
    const customAppend = self.config.appendTo !== void 0 && self.config.appendTo.nodeType !== void 0;
    if (self.config.inline || self.config.static) {
      self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
      if (self.config.inline) {
        if (!customAppend && self.element.parentNode)
          self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
        else if (self.config.appendTo !== void 0)
          self.config.appendTo.appendChild(self.calendarContainer);
      }
      if (self.config.static) {
        const wrapper = createElement("div", "flatpickr-wrapper");
        if (self.element.parentNode)
          self.element.parentNode.insertBefore(wrapper, self.element);
        wrapper.appendChild(self.element);
        if (self.altInput)
          wrapper.appendChild(self.altInput);
        wrapper.appendChild(self.calendarContainer);
      }
    }
    if (!self.config.static && !self.config.inline)
      (self.config.appendTo !== void 0 ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
  }
  function createDay(className, date, dayNumber, i) {
    const dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
    dayElement.dateObj = date;
    dayElement.$i = i;
    dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
    if (className.indexOf("hidden") === -1 && compareDates(date, self.now) === 0) {
      self.todayDateElem = dayElement;
      dayElement.classList.add("today");
      dayElement.setAttribute("aria-current", "date");
    }
    if (dateIsEnabled) {
      dayElement.tabIndex = -1;
      if (isDateSelected(date)) {
        dayElement.classList.add("selected");
        self.selectedDateElem = dayElement;
        if (self.config.mode === "range") {
          toggleClass(dayElement, "startRange", self.selectedDates[0] && compareDates(date, self.selectedDates[0], true) === 0);
          toggleClass(dayElement, "endRange", self.selectedDates[1] && compareDates(date, self.selectedDates[1], true) === 0);
          if (className === "nextMonthDay")
            dayElement.classList.add("inRange");
        }
      }
    } else {
      dayElement.classList.add("flatpickr-disabled");
    }
    if (self.config.mode === "range") {
      if (isDateInRange(date) && !isDateSelected(date))
        dayElement.classList.add("inRange");
    }
    if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && dayNumber % 7 === 1) {
      self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
    }
    triggerEvent("onDayCreate", dayElement);
    return dayElement;
  }
  function focusOnDayElem(targetNode) {
    targetNode.focus();
    if (self.config.mode === "range")
      onMouseOver(targetNode);
  }
  function getFirstAvailableDay(delta) {
    const startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
    const endMonth = delta > 0 ? self.config.showMonths : -1;
    for (let m = startMonth; m != endMonth; m += delta) {
      const month = self.daysContainer.children[m];
      const startIndex = delta > 0 ? 0 : month.children.length - 1;
      const endIndex = delta > 0 ? month.children.length : -1;
      for (let i = startIndex; i != endIndex; i += delta) {
        const c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
          return c;
      }
    }
    return void 0;
  }
  function getNextAvailableDay(current, delta) {
    const givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
    const endMonth = delta > 0 ? self.config.showMonths : -1;
    const loopDelta = delta > 0 ? 1 : -1;
    for (let m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
      const month = self.daysContainer.children[m];
      const startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
      const numMonthDays = month.children.length;
      for (let i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
        const c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta))
          return focusOnDayElem(c);
      }
    }
    self.changeMonth(loopDelta);
    focusOnDay(getFirstAvailableDay(loopDelta), 0);
    return void 0;
  }
  function focusOnDay(current, offset) {
    const dayFocused = isInView(document.activeElement || document.body);
    const startElem = current !== void 0 ? current : dayFocused ? document.activeElement : self.selectedDateElem !== void 0 && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== void 0 && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
    if (startElem === void 0) {
      self._input.focus();
    } else if (!dayFocused) {
      focusOnDayElem(startElem);
    } else {
      getNextAvailableDay(startElem, offset);
    }
  }
  function buildMonthDays(year, month) {
    const firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
    const prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
    const daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
    let dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
    for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
      days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
    }
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
      days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
    }
    for (let dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
      days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
    }
    const dayContainer = createElement("div", "dayContainer");
    dayContainer.appendChild(days);
    return dayContainer;
  }
  function buildDays() {
    if (self.daysContainer === void 0) {
      return;
    }
    clearNode(self.daysContainer);
    if (self.weekNumbers)
      clearNode(self.weekNumbers);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < self.config.showMonths; i++) {
      const d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
    }
    self.daysContainer.appendChild(frag);
    self.days = self.daysContainer.firstChild;
    if (self.config.mode === "range" && self.selectedDates.length === 1) {
      onMouseOver();
    }
  }
  function buildMonthSwitch() {
    if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown")
      return;
    const shouldBuildMonth = function(month) {
      if (self.config.minDate !== void 0 && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) {
        return false;
      }
      return !(self.config.maxDate !== void 0 && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
    };
    self.monthsDropdownContainer.tabIndex = -1;
    self.monthsDropdownContainer.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      if (!shouldBuildMonth(i))
        continue;
      const month = createElement("option", "flatpickr-monthDropdown-month");
      month.value = new Date(self.currentYear, i).getMonth().toString();
      month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
      month.tabIndex = -1;
      if (self.currentMonth === i) {
        month.selected = true;
      }
      self.monthsDropdownContainer.appendChild(month);
    }
  }
  function buildMonth() {
    const container = createElement("div", "flatpickr-month");
    const monthNavFragment = window.document.createDocumentFragment();
    let monthElement;
    if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
      monthElement = createElement("span", "cur-month");
    } else {
      self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
      self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
      bind(self.monthsDropdownContainer, "change", (e) => {
        const target = getEventTarget(e);
        const selectedMonth = parseInt(target.value, 10);
        self.changeMonth(selectedMonth - self.currentMonth);
        triggerEvent("onMonthChange");
      });
      buildMonthSwitch();
      monthElement = self.monthsDropdownContainer;
    }
    const yearInput = createNumberInput("cur-year", { tabindex: "-1" });
    const yearElement = yearInput.getElementsByTagName("input")[0];
    yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
    if (self.config.minDate) {
      yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
    }
    if (self.config.maxDate) {
      yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
      yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
    }
    const currentMonth = createElement("div", "flatpickr-current-month");
    currentMonth.appendChild(monthElement);
    currentMonth.appendChild(yearInput);
    monthNavFragment.appendChild(currentMonth);
    container.appendChild(monthNavFragment);
    return {
      container,
      yearElement,
      monthElement
    };
  }
  function buildMonths() {
    clearNode(self.monthNav);
    self.monthNav.appendChild(self.prevMonthNav);
    if (self.config.showMonths) {
      self.yearElements = [];
      self.monthElements = [];
    }
    for (let m = self.config.showMonths; m--; ) {
      const month = buildMonth();
      self.yearElements.push(month.yearElement);
      self.monthElements.push(month.monthElement);
      self.monthNav.appendChild(month.container);
    }
    self.monthNav.appendChild(self.nextMonthNav);
  }
  function buildMonthNav() {
    self.monthNav = createElement("div", "flatpickr-months");
    self.yearElements = [];
    self.monthElements = [];
    self.prevMonthNav = createElement("span", "flatpickr-prev-month");
    self.prevMonthNav.innerHTML = self.config.prevArrow;
    self.nextMonthNav = createElement("span", "flatpickr-next-month");
    self.nextMonthNav.innerHTML = self.config.nextArrow;
    buildMonths();
    Object.defineProperty(self, "_hidePrevMonthArrow", {
      get: () => self.__hidePrevMonthArrow,
      set(bool) {
        if (self.__hidePrevMonthArrow !== bool) {
          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
          self.__hidePrevMonthArrow = bool;
        }
      }
    });
    Object.defineProperty(self, "_hideNextMonthArrow", {
      get: () => self.__hideNextMonthArrow,
      set(bool) {
        if (self.__hideNextMonthArrow !== bool) {
          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
          self.__hideNextMonthArrow = bool;
        }
      }
    });
    self.currentYearElement = self.yearElements[0];
    updateNavigationCurrentMonth();
    return self.monthNav;
  }
  function buildTime() {
    self.calendarContainer.classList.add("hasTime");
    if (self.config.noCalendar)
      self.calendarContainer.classList.add("noCalendar");
    const defaults2 = getDefaultHours(self.config);
    self.timeContainer = createElement("div", "flatpickr-time");
    self.timeContainer.tabIndex = -1;
    const separator = createElement("span", "flatpickr-time-separator", ":");
    const hourInput = createNumberInput("flatpickr-hour", {
      "aria-label": self.l10n.hourAriaLabel
    });
    self.hourElement = hourInput.getElementsByTagName("input")[0];
    const minuteInput = createNumberInput("flatpickr-minute", {
      "aria-label": self.l10n.minuteAriaLabel
    });
    self.minuteElement = minuteInput.getElementsByTagName("input")[0];
    self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
    self.hourElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults2.hours : military2ampm(defaults2.hours));
    self.minuteElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults2.minutes);
    self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
    self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
    self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
    self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
    self.hourElement.setAttribute("maxlength", "2");
    self.minuteElement.setAttribute("min", "0");
    self.minuteElement.setAttribute("max", "59");
    self.minuteElement.setAttribute("maxlength", "2");
    self.timeContainer.appendChild(hourInput);
    self.timeContainer.appendChild(separator);
    self.timeContainer.appendChild(minuteInput);
    if (self.config.time_24hr)
      self.timeContainer.classList.add("time24hr");
    if (self.config.enableSeconds) {
      self.timeContainer.classList.add("hasSeconds");
      const secondInput = createNumberInput("flatpickr-second");
      self.secondElement = secondInput.getElementsByTagName("input")[0];
      self.secondElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults2.seconds);
      self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
      self.secondElement.setAttribute("min", "0");
      self.secondElement.setAttribute("max", "59");
      self.secondElement.setAttribute("maxlength", "2");
      self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
      self.timeContainer.appendChild(secondInput);
    }
    if (!self.config.time_24hr) {
      self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
      self.amPM.title = self.l10n.toggleTitle;
      self.amPM.tabIndex = -1;
      self.timeContainer.appendChild(self.amPM);
    }
    return self.timeContainer;
  }
  function buildWeekdays() {
    if (!self.weekdayContainer)
      self.weekdayContainer = createElement("div", "flatpickr-weekdays");
    else
      clearNode(self.weekdayContainer);
    for (let i = self.config.showMonths; i--; ) {
      const container = createElement("div", "flatpickr-weekdaycontainer");
      self.weekdayContainer.appendChild(container);
    }
    updateWeekdays();
    return self.weekdayContainer;
  }
  function updateWeekdays() {
    if (!self.weekdayContainer) {
      return;
    }
    const firstDayOfWeek = self.l10n.firstDayOfWeek;
    let weekdays = [...self.l10n.weekdays.shorthand];
    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = [
        ...weekdays.splice(firstDayOfWeek, weekdays.length),
        ...weekdays.splice(0, firstDayOfWeek)
      ];
    }
    for (let i = self.config.showMonths; i--; ) {
      self.weekdayContainer.children[i].innerHTML = `
      <span class='flatpickr-weekday'>
        ${weekdays.join("</span><span class='flatpickr-weekday'>")}
      </span>
      `;
    }
  }
  function buildWeeks() {
    self.calendarContainer.classList.add("hasWeeks");
    const weekWrapper = createElement("div", "flatpickr-weekwrapper");
    weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
    const weekNumbers = createElement("div", "flatpickr-weeks");
    weekWrapper.appendChild(weekNumbers);
    return {
      weekWrapper,
      weekNumbers
    };
  }
  function changeMonth(value, isOffset = true) {
    const delta = isOffset ? value : value - self.currentMonth;
    if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true)
      return;
    self.currentMonth += delta;
    if (self.currentMonth < 0 || self.currentMonth > 11) {
      self.currentYear += self.currentMonth > 11 ? 1 : -1;
      self.currentMonth = (self.currentMonth + 12) % 12;
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    buildDays();
    triggerEvent("onMonthChange");
    updateNavigationCurrentMonth();
  }
  function clear(triggerChangeEvent = true, toInitial = true) {
    self.input.value = "";
    if (self.altInput !== void 0)
      self.altInput.value = "";
    if (self.mobileInput !== void 0)
      self.mobileInput.value = "";
    self.selectedDates = [];
    self.latestSelectedDateObj = void 0;
    if (toInitial === true) {
      self.currentYear = self._initialDate.getFullYear();
      self.currentMonth = self._initialDate.getMonth();
    }
    if (self.config.enableTime === true) {
      const { hours, minutes, seconds } = getDefaultHours(self.config);
      setHours(hours, minutes, seconds);
    }
    self.redraw();
    if (triggerChangeEvent)
      triggerEvent("onChange");
  }
  function close() {
    self.isOpen = false;
    if (!self.isMobile) {
      if (self.calendarContainer !== void 0) {
        self.calendarContainer.classList.remove("open");
      }
      if (self._input !== void 0) {
        self._input.classList.remove("active");
      }
    }
    triggerEvent("onClose");
  }
  function destroy() {
    if (self.config !== void 0)
      triggerEvent("onDestroy");
    for (let i = self._handlers.length; i--; ) {
      self._handlers[i].remove();
    }
    self._handlers = [];
    if (self.mobileInput) {
      if (self.mobileInput.parentNode)
        self.mobileInput.parentNode.removeChild(self.mobileInput);
      self.mobileInput = void 0;
    } else if (self.calendarContainer && self.calendarContainer.parentNode) {
      if (self.config.static && self.calendarContainer.parentNode) {
        const wrapper = self.calendarContainer.parentNode;
        wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
        if (wrapper.parentNode) {
          while (wrapper.firstChild)
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
      } else
        self.calendarContainer.parentNode.removeChild(self.calendarContainer);
    }
    if (self.altInput) {
      self.input.type = "text";
      if (self.altInput.parentNode)
        self.altInput.parentNode.removeChild(self.altInput);
      delete self.altInput;
    }
    if (self.input) {
      self.input.type = self.input._type;
      self.input.classList.remove("flatpickr-input");
      self.input.removeAttribute("readonly");
    }
    [
      "_showTimeInput",
      "latestSelectedDateObj",
      "_hideNextMonthArrow",
      "_hidePrevMonthArrow",
      "__hideNextMonthArrow",
      "__hidePrevMonthArrow",
      "isMobile",
      "isOpen",
      "selectedDateElem",
      "minDateHasTime",
      "maxDateHasTime",
      "days",
      "daysContainer",
      "_input",
      "_positionElement",
      "innerContainer",
      "rContainer",
      "monthNav",
      "todayDateElem",
      "calendarContainer",
      "weekdayContainer",
      "prevMonthNav",
      "nextMonthNav",
      "monthsDropdownContainer",
      "currentMonthElement",
      "currentYearElement",
      "navigationCurrentMonth",
      "selectedDateElem",
      "config"
    ].forEach((k) => {
      try {
        delete self[k];
      } catch (_) {
      }
    });
  }
  function isCalendarElem(elem) {
    if (self.config.appendTo && self.config.appendTo.contains(elem))
      return true;
    return self.calendarContainer.contains(elem);
  }
  function documentClick(e) {
    if (self.isOpen && !self.config.inline) {
      const eventTarget = getEventTarget(e);
      const isCalendarElement = isCalendarElem(eventTarget);
      const isInput = eventTarget === self.input || eventTarget === self.altInput || self.element.contains(eventTarget) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
      const lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
      const isIgnored = !self.config.ignoredFocusElements.some((elem) => elem.contains(eventTarget));
      if (lostFocus && isIgnored) {
        if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0 && self.input.value !== "" && self.input.value !== void 0) {
          updateTime();
        }
        self.close();
        if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) {
          self.clear(false);
          self.redraw();
        }
      }
    }
  }
  function changeYear(newYear) {
    if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear())
      return;
    const newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
    self.currentYear = newYearNum || self.currentYear;
    if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
      self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
    } else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
      self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
    }
    if (isNewYear) {
      self.redraw();
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
  }
  function isEnabled(date, timeless = true) {
    var _a;
    const dateToCheck = self.parseDate(date, void 0, timeless);
    if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== void 0 ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== void 0 ? timeless : !self.maxDateHasTime) > 0)
      return false;
    if (!self.config.enable && self.config.disable.length === 0)
      return true;
    if (dateToCheck === void 0)
      return false;
    const bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
    for (let i = 0, d; i < array.length; i++) {
      d = array[i];
      if (typeof d === "function" && d(dateToCheck))
        return bool;
      else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime())
        return bool;
      else if (typeof d === "string") {
        const parsed = self.parseDate(d, void 0, true);
        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
      } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime())
        return bool;
    }
    return !bool;
  }
  function isInView(elem) {
    if (self.daysContainer !== void 0)
      return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
    return false;
  }
  function onBlur(e) {
    const isInput = e.target === self._input;
    if (isInput && (self.selectedDates.length > 0 || self._input.value.length > 0) && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
      self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
    }
  }
  function onKeyDown(e) {
    const eventTarget = getEventTarget(e);
    const isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
    const allowInput = self.config.allowInput;
    const allowKeydown = self.isOpen && (!allowInput || !isInput);
    const allowInlineKeydown = self.config.inline && isInput && !allowInput;
    if (e.keyCode === 13 && isInput) {
      if (allowInput) {
        self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
        return eventTarget.blur();
      } else {
        self.open();
      }
    } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
      const isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
      switch (e.keyCode) {
        case 13:
          if (isTimeObj) {
            e.preventDefault();
            updateTime();
            focusAndClose();
          } else
            selectDate(e);
          break;
        case 27:
          e.preventDefault();
          focusAndClose();
          break;
        case 8:
        case 46:
          if (isInput && !self.config.allowInput) {
            e.preventDefault();
            self.clear();
          }
          break;
        case 37:
        case 39:
          if (!isTimeObj && !isInput) {
            e.preventDefault();
            if (self.daysContainer !== void 0 && (allowInput === false || document.activeElement && isInView(document.activeElement))) {
              const delta2 = e.keyCode === 39 ? 1 : -1;
              if (!e.ctrlKey)
                focusOnDay(void 0, delta2);
              else {
                e.stopPropagation();
                changeMonth(delta2);
                focusOnDay(getFirstAvailableDay(1), 0);
              }
            }
          } else if (self.hourElement)
            self.hourElement.focus();
          break;
        case 38:
        case 40:
          e.preventDefault();
          const delta = e.keyCode === 40 ? 1 : -1;
          if (self.daysContainer && eventTarget.$i !== void 0 || eventTarget === self.input || eventTarget === self.altInput) {
            if (e.ctrlKey) {
              e.stopPropagation();
              changeYear(self.currentYear - delta);
              focusOnDay(getFirstAvailableDay(1), 0);
            } else if (!isTimeObj)
              focusOnDay(void 0, delta * 7);
          } else if (eventTarget === self.currentYearElement) {
            changeYear(self.currentYear - delta);
          } else if (self.config.enableTime) {
            if (!isTimeObj && self.hourElement)
              self.hourElement.focus();
            updateTime(e);
            self._debouncedChange();
          }
          break;
        case 9:
          if (isTimeObj) {
            const elems = [
              self.hourElement,
              self.minuteElement,
              self.secondElement,
              self.amPM
            ].concat(self.pluginElements).filter((x) => x);
            const i = elems.indexOf(eventTarget);
            if (i !== -1) {
              const target = elems[i + (e.shiftKey ? -1 : 1)];
              e.preventDefault();
              (target || self._input).focus();
            }
          } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
            e.preventDefault();
            self._input.focus();
          }
          break;
      }
    }
    if (self.amPM !== void 0 && eventTarget === self.amPM) {
      switch (e.key) {
        case self.l10n.amPM[0].charAt(0):
        case self.l10n.amPM[0].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[0];
          setHoursFromInputs();
          updateValue();
          break;
        case self.l10n.amPM[1].charAt(0):
        case self.l10n.amPM[1].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[1];
          setHoursFromInputs();
          updateValue();
          break;
      }
    }
    if (isInput || isCalendarElem(eventTarget)) {
      triggerEvent("onKeyDown", e);
    }
  }
  function onMouseOver(elem) {
    if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains("flatpickr-day") || elem.classList.contains("flatpickr-disabled")))
      return;
    const hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
    let containsDisabled = false;
    let minRange = 0, maxRange = 0;
    for (let t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
      if (!isEnabled(new Date(t), true)) {
        containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
        if (t < initialDate && (!minRange || t > minRange))
          minRange = t;
        else if (t > initialDate && (!maxRange || t < maxRange))
          maxRange = t;
      }
    }
    for (let m = 0; m < self.config.showMonths; m++) {
      const month = self.daysContainer.children[m];
      for (let i = 0, l = month.children.length; i < l; i++) {
        const dayElem = month.children[i], date = dayElem.dateObj;
        const timestamp = date.getTime();
        const outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
        if (outOfRange) {
          dayElem.classList.add("notAllowed");
          ["inRange", "startRange", "endRange"].forEach((c) => {
            dayElem.classList.remove(c);
          });
          continue;
        } else if (containsDisabled && !outOfRange)
          continue;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach((c) => {
          dayElem.classList.remove(c);
        });
        if (elem !== void 0) {
          elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
          if (initialDate < hoverDate && timestamp === initialDate)
            dayElem.classList.add("startRange");
          else if (initialDate > hoverDate && timestamp === initialDate)
            dayElem.classList.add("endRange");
          if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate))
            dayElem.classList.add("inRange");
        }
      }
    }
  }
  function onResize() {
    if (self.isOpen && !self.config.static && !self.config.inline)
      positionCalendar();
  }
  function open(e, positionElement = self._positionElement) {
    if (self.isMobile === true) {
      if (e) {
        e.preventDefault();
        const eventTarget = getEventTarget(e);
        if (eventTarget) {
          eventTarget.blur();
        }
      }
      if (self.mobileInput !== void 0) {
        self.mobileInput.focus();
        self.mobileInput.click();
      }
      triggerEvent("onOpen");
      return;
    } else if (self._input.disabled || self.config.inline) {
      return;
    }
    const wasOpen = self.isOpen;
    self.isOpen = true;
    if (!wasOpen) {
      self.calendarContainer.classList.add("open");
      self._input.classList.add("active");
      triggerEvent("onOpen");
      positionCalendar(positionElement);
    }
    if (self.config.enableTime === true && self.config.noCalendar === true) {
      if (self.config.allowInput === false && (e === void 0 || !self.timeContainer.contains(e.relatedTarget))) {
        setTimeout(() => self.hourElement.select(), 50);
      }
    }
  }
  function minMaxDateSetter(type) {
    return (date) => {
      const dateObj = self.config[`_${type}Date`] = self.parseDate(date, self.config.dateFormat);
      const inverseDateObj = self.config[`_${type === "min" ? "max" : "min"}Date`];
      if (dateObj !== void 0) {
        self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
      }
      if (self.selectedDates) {
        self.selectedDates = self.selectedDates.filter((d) => isEnabled(d));
        if (!self.selectedDates.length && type === "min")
          setHoursFromDate(dateObj);
        updateValue();
      }
      if (self.daysContainer) {
        redraw();
        if (dateObj !== void 0)
          self.currentYearElement[type] = dateObj.getFullYear().toString();
        else
          self.currentYearElement.removeAttribute(type);
        self.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
      }
    };
  }
  function parseConfig() {
    const boolOpts = [
      "wrap",
      "weekNumbers",
      "allowInput",
      "allowInvalidPreload",
      "clickOpens",
      "time_24hr",
      "enableTime",
      "noCalendar",
      "altInput",
      "shorthandCurrentMonth",
      "inline",
      "static",
      "enableSeconds",
      "disableMobile"
    ];
    const userConfig = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
    const formats2 = {};
    self.config.parseDate = userConfig.parseDate;
    self.config.formatDate = userConfig.formatDate;
    Object.defineProperty(self.config, "enable", {
      get: () => self.config._enable,
      set: (dates) => {
        self.config._enable = parseDateRules(dates);
      }
    });
    Object.defineProperty(self.config, "disable", {
      get: () => self.config._disable,
      set: (dates) => {
        self.config._disable = parseDateRules(dates);
      }
    });
    const timeMode = userConfig.mode === "time";
    if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
      const defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
      formats2.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    }
    if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
      const defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
      formats2.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + ` h:i${userConfig.enableSeconds ? ":S" : ""} K`;
    }
    Object.defineProperty(self.config, "minDate", {
      get: () => self.config._minDate,
      set: minMaxDateSetter("min")
    });
    Object.defineProperty(self.config, "maxDate", {
      get: () => self.config._maxDate,
      set: minMaxDateSetter("max")
    });
    const minMaxTimeSetter = (type) => (val) => {
      self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
    };
    Object.defineProperty(self.config, "minTime", {
      get: () => self.config._minTime,
      set: minMaxTimeSetter("min")
    });
    Object.defineProperty(self.config, "maxTime", {
      get: () => self.config._maxTime,
      set: minMaxTimeSetter("max")
    });
    if (userConfig.mode === "time") {
      self.config.noCalendar = true;
      self.config.enableTime = true;
    }
    Object.assign(self.config, formats2, userConfig);
    for (let i = 0; i < boolOpts.length; i++)
      self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
    HOOKS.filter((hook) => self.config[hook] !== void 0).forEach((hook) => {
      self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
    });
    self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (let i = 0; i < self.config.plugins.length; i++) {
      const pluginConf = self.config.plugins[i](self) || {};
      for (const key in pluginConf) {
        if (HOOKS.indexOf(key) > -1) {
          self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
        } else if (typeof userConfig[key] === "undefined")
          self.config[key] = pluginConf[key];
      }
    }
    if (!userConfig.altInputClass) {
      self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
    }
    triggerEvent("onParseConfig");
  }
  function getInputElem() {
    return self.config.wrap ? element.querySelector("[data-input]") : element;
  }
  function setupLocale() {
    if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined")
      self.config.errorHandler(new Error(`flatpickr: invalid locale ${self.config.locale}`));
    self.l10n = Object.assign(Object.assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : void 0);
    tokenRegex.K = `(${self.l10n.amPM[0]}|${self.l10n.amPM[1]}|${self.l10n.amPM[0].toLowerCase()}|${self.l10n.amPM[1].toLowerCase()})`;
    const userConfig = Object.assign(Object.assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
    if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) {
      self.config.time_24hr = self.l10n.time_24hr;
    }
    self.formatDate = createDateFormatter(self);
    self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
  }
  function positionCalendar(customPositionElement) {
    if (typeof self.config.position === "function") {
      return void self.config.position(self, customPositionElement);
    }
    if (self.calendarContainer === void 0)
      return;
    triggerEvent("onPreCalendarPosition");
    const positionElement = customPositionElement || self._positionElement;
    const calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (acc, child) => acc + child.offsetHeight, 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
    const top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
    toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
    toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
    if (self.config.inline)
      return;
    let left = window.pageXOffset + inputBounds.left;
    let isCenter = false;
    let isRight = false;
    if (configPosHorizontal === "center") {
      left -= (calendarWidth - inputBounds.width) / 2;
      isCenter = true;
    } else if (configPosHorizontal === "right") {
      left -= calendarWidth - inputBounds.width;
      isRight = true;
    }
    toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
    toggleClass(self.calendarContainer, "arrowCenter", isCenter);
    toggleClass(self.calendarContainer, "arrowRight", isRight);
    const right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
    const rightMost = left + calendarWidth > window.document.body.offsetWidth;
    const centerMost = right + calendarWidth > window.document.body.offsetWidth;
    toggleClass(self.calendarContainer, "rightMost", rightMost);
    if (self.config.static)
      return;
    self.calendarContainer.style.top = `${top}px`;
    if (!rightMost) {
      self.calendarContainer.style.left = `${left}px`;
      self.calendarContainer.style.right = "auto";
    } else if (!centerMost) {
      self.calendarContainer.style.left = "auto";
      self.calendarContainer.style.right = `${right}px`;
    } else {
      const doc = getDocumentStyleSheet();
      if (doc === void 0)
        return;
      const bodyWidth = window.document.body.offsetWidth;
      const centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
      const centerBefore = ".flatpickr-calendar.centerMost:before";
      const centerAfter = ".flatpickr-calendar.centerMost:after";
      const centerIndex = doc.cssRules.length;
      const centerStyle = `{left:${inputBounds.left}px;right:auto;}`;
      toggleClass(self.calendarContainer, "rightMost", false);
      toggleClass(self.calendarContainer, "centerMost", true);
      doc.insertRule(`${centerBefore},${centerAfter}${centerStyle}`, centerIndex);
      self.calendarContainer.style.left = `${centerLeft}px`;
      self.calendarContainer.style.right = "auto";
    }
  }
  function getDocumentStyleSheet() {
    let editableSheet = null;
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      try {
        sheet.cssRules;
      } catch (err) {
        continue;
      }
      editableSheet = sheet;
      break;
    }
    return editableSheet != null ? editableSheet : createStyleSheet();
  }
  function createStyleSheet() {
    const style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
  }
  function redraw() {
    if (self.config.noCalendar || self.isMobile)
      return;
    buildMonthSwitch();
    updateNavigationCurrentMonth();
    buildDays();
  }
  function focusAndClose() {
    self._input.focus();
    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) {
      setTimeout(self.close, 0);
    } else {
      self.close();
    }
  }
  function selectDate(e) {
    e.preventDefault();
    e.stopPropagation();
    const isSelectable = (day) => day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
    const t = findParent(getEventTarget(e), isSelectable);
    if (t === void 0)
      return;
    const target = t;
    const selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
    const shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
    self.selectedDateElem = target;
    if (self.config.mode === "single")
      self.selectedDates = [selectedDate];
    else if (self.config.mode === "multiple") {
      const selectedIndex = isDateSelected(selectedDate);
      if (selectedIndex)
        self.selectedDates.splice(parseInt(selectedIndex), 1);
      else
        self.selectedDates.push(selectedDate);
    } else if (self.config.mode === "range") {
      if (self.selectedDates.length === 2) {
        self.clear(false, false);
      }
      self.latestSelectedDateObj = selectedDate;
      self.selectedDates.push(selectedDate);
      if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
        self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }
    setHoursFromInputs();
    if (shouldChangeMonth) {
      const isNewYear = self.currentYear !== selectedDate.getFullYear();
      self.currentYear = selectedDate.getFullYear();
      self.currentMonth = selectedDate.getMonth();
      if (isNewYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      triggerEvent("onMonthChange");
    }
    updateNavigationCurrentMonth();
    buildDays();
    updateValue();
    if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1)
      focusOnDayElem(target);
    else if (self.selectedDateElem !== void 0 && self.hourElement === void 0) {
      self.selectedDateElem && self.selectedDateElem.focus();
    }
    if (self.hourElement !== void 0)
      self.hourElement !== void 0 && self.hourElement.focus();
    if (self.config.closeOnSelect) {
      const single = self.config.mode === "single" && !self.config.enableTime;
      const range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
      if (single || range) {
        focusAndClose();
      }
    }
    triggerChange();
  }
  const CALLBACKS = {
    locale: [setupLocale, updateWeekdays],
    showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
    minDate: [jumpToDate],
    maxDate: [jumpToDate],
    clickOpens: [
      () => {
        if (self.config.clickOpens === true) {
          bind(self._input, "focus", self.open);
          bind(self._input, "click", self.open);
        } else {
          self._input.removeEventListener("focus", self.open);
          self._input.removeEventListener("click", self.open);
        }
      }
    ]
  };
  function set(option, value) {
    if (option !== null && typeof option === "object") {
      Object.assign(self.config, option);
      for (const key in option) {
        if (CALLBACKS[key] !== void 0)
          CALLBACKS[key].forEach((x) => x());
      }
    } else {
      self.config[option] = value;
      if (CALLBACKS[option] !== void 0)
        CALLBACKS[option].forEach((x) => x());
      else if (HOOKS.indexOf(option) > -1)
        self.config[option] = arrayify(value);
    }
    self.redraw();
    updateValue(true);
  }
  function setSelectedDate(inputDate, format) {
    let dates = [];
    if (inputDate instanceof Array)
      dates = inputDate.map((d) => self.parseDate(d, format));
    else if (inputDate instanceof Date || typeof inputDate === "number")
      dates = [self.parseDate(inputDate, format)];
    else if (typeof inputDate === "string") {
      switch (self.config.mode) {
        case "single":
        case "time":
          dates = [self.parseDate(inputDate, format)];
          break;
        case "multiple":
          dates = inputDate.split(self.config.conjunction).map((date) => self.parseDate(date, format));
          break;
        case "range":
          dates = inputDate.split(self.l10n.rangeSeparator).map((date) => self.parseDate(date, format));
          break;
      }
    } else
      self.config.errorHandler(new Error(`Invalid date supplied: ${JSON.stringify(inputDate)}`));
    self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter((d) => d instanceof Date && isEnabled(d, false));
    if (self.config.mode === "range")
      self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
  }
  function setDate(date, triggerChange2 = false, format = self.config.dateFormat) {
    if (date !== 0 && !date || date instanceof Array && date.length === 0)
      return self.clear(triggerChange2);
    setSelectedDate(date, format);
    self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
    self.redraw();
    jumpToDate(void 0, triggerChange2);
    setHoursFromDate();
    if (self.selectedDates.length === 0) {
      self.clear(false);
    }
    updateValue(triggerChange2);
    if (triggerChange2)
      triggerEvent("onChange");
  }
  function parseDateRules(arr) {
    return arr.slice().map((rule) => {
      if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return self.parseDate(rule, void 0, true);
      } else if (rule && typeof rule === "object" && rule.from && rule.to)
        return {
          from: self.parseDate(rule.from, void 0),
          to: self.parseDate(rule.to, void 0)
        };
      return rule;
    }).filter((x) => x);
  }
  function setupDates() {
    self.selectedDates = [];
    self.now = self.parseDate(self.config.now) || new Date();
    const preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
    if (preloadedDate)
      setSelectedDate(preloadedDate, self.config.dateFormat);
    self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
    self.currentYear = self._initialDate.getFullYear();
    self.currentMonth = self._initialDate.getMonth();
    if (self.selectedDates.length > 0)
      self.latestSelectedDateObj = self.selectedDates[0];
    if (self.config.minTime !== void 0)
      self.config.minTime = self.parseDate(self.config.minTime, "H:i");
    if (self.config.maxTime !== void 0)
      self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
    self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
    self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
  }
  function setupInputs() {
    self.input = getInputElem();
    if (!self.input) {
      self.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    self.input._type = self.input.type;
    self.input.type = "text";
    self.input.classList.add("flatpickr-input");
    self._input = self.input;
    if (self.config.altInput) {
      self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
      self._input = self.altInput;
      self.altInput.placeholder = self.input.placeholder;
      self.altInput.disabled = self.input.disabled;
      self.altInput.required = self.input.required;
      self.altInput.tabIndex = self.input.tabIndex;
      self.altInput.type = "text";
      self.input.setAttribute("type", "hidden");
      if (!self.config.static && self.input.parentNode)
        self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
    }
    if (!self.config.allowInput)
      self._input.setAttribute("readonly", "readonly");
    self._positionElement = self.config.positionElement || self._input;
  }
  function setupMobile() {
    const inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
    self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
    self.mobileInput.tabIndex = 1;
    self.mobileInput.type = inputType;
    self.mobileInput.disabled = self.input.disabled;
    self.mobileInput.required = self.input.required;
    self.mobileInput.placeholder = self.input.placeholder;
    self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
    if (self.selectedDates.length > 0) {
      self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
    }
    if (self.config.minDate)
      self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
    if (self.config.maxDate)
      self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
    if (self.input.getAttribute("step"))
      self.mobileInput.step = String(self.input.getAttribute("step"));
    self.input.type = "hidden";
    if (self.altInput !== void 0)
      self.altInput.type = "hidden";
    try {
      if (self.input.parentNode)
        self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
    } catch (_a) {
    }
    bind(self.mobileInput, "change", (e) => {
      self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
      triggerEvent("onChange");
      triggerEvent("onClose");
    });
  }
  function toggle(e) {
    if (self.isOpen === true)
      return self.close();
    self.open(e);
  }
  function triggerEvent(event, data2) {
    if (self.config === void 0)
      return;
    const hooks = self.config[event];
    if (hooks !== void 0 && hooks.length > 0) {
      for (let i = 0; hooks[i] && i < hooks.length; i++)
        hooks[i](self.selectedDates, self.input.value, self, data2);
    }
    if (event === "onChange") {
      self.input.dispatchEvent(createEvent("change"));
      self.input.dispatchEvent(createEvent("input"));
    }
  }
  function createEvent(name2) {
    const e = document.createEvent("Event");
    e.initEvent(name2, true, true);
    return e;
  }
  function isDateSelected(date) {
    for (let i = 0; i < self.selectedDates.length; i++) {
      if (compareDates(self.selectedDates[i], date) === 0)
        return "" + i;
    }
    return false;
  }
  function isDateInRange(date) {
    if (self.config.mode !== "range" || self.selectedDates.length < 2)
      return false;
    return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
  }
  function updateNavigationCurrentMonth() {
    if (self.config.noCalendar || self.isMobile || !self.monthNav)
      return;
    self.yearElements.forEach((yearElement, i) => {
      const d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
        self.monthElements[i].textContent = monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
      } else {
        self.monthsDropdownContainer.value = d.getMonth().toString();
      }
      yearElement.value = d.getFullYear().toString();
    });
    self._hidePrevMonthArrow = self.config.minDate !== void 0 && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
    self._hideNextMonthArrow = self.config.maxDate !== void 0 && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
  }
  function getDateStr(format) {
    return self.selectedDates.map((dObj) => self.formatDate(dObj, format)).filter((d, i, arr) => self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
  }
  function updateValue(triggerChange2 = true) {
    if (self.mobileInput !== void 0 && self.mobileFormatStr) {
      self.mobileInput.value = self.latestSelectedDateObj !== void 0 ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
    }
    self.input.value = getDateStr(self.config.dateFormat);
    if (self.altInput !== void 0) {
      self.altInput.value = getDateStr(self.config.altFormat);
    }
    if (triggerChange2 !== false)
      triggerEvent("onValueUpdate");
  }
  function onMonthNavClick(e) {
    const eventTarget = getEventTarget(e);
    const isPrevMonth = self.prevMonthNav.contains(eventTarget);
    const isNextMonth = self.nextMonthNav.contains(eventTarget);
    if (isPrevMonth || isNextMonth) {
      changeMonth(isPrevMonth ? -1 : 1);
    } else if (self.yearElements.indexOf(eventTarget) >= 0) {
      eventTarget.select();
    } else if (eventTarget.classList.contains("arrowUp")) {
      self.changeYear(self.currentYear + 1);
    } else if (eventTarget.classList.contains("arrowDown")) {
      self.changeYear(self.currentYear - 1);
    }
  }
  function timeWrapper(e) {
    e.preventDefault();
    const isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
    if (self.amPM !== void 0 && eventTarget === self.amPM) {
      self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
    }
    const min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
    let newValue = curValue + step * delta;
    if (typeof input.value !== "undefined" && input.value.length === 2) {
      const isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
      if (newValue < min) {
        newValue = max + newValue + int(!isHourElem) + (int(isHourElem) && int(!self.amPM));
        if (isMinuteElem)
          incrementNumInput(void 0, -1, self.hourElement);
      } else if (newValue > max) {
        newValue = input === self.hourElement ? newValue - max - int(!self.amPM) : min;
        if (isMinuteElem)
          incrementNumInput(void 0, 1, self.hourElement);
      }
      if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
        self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
      }
      input.value = pad(newValue);
    }
  }
  init2();
  return self;
}
function _flatpickr(nodeList, config) {
  const nodes = Array.prototype.slice.call(nodeList).filter((x) => x instanceof HTMLElement);
  const instances = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    try {
      if (node.getAttribute("data-fp-omit") !== null)
        continue;
      if (node._flatpickr !== void 0) {
        node._flatpickr.destroy();
        node._flatpickr = void 0;
      }
      node._flatpickr = FlatpickrInstance(node, config || {});
      instances.push(node._flatpickr);
    } catch (e) {
      console.error(e);
    }
  }
  return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
  HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
  HTMLElement.prototype.flatpickr = function(config) {
    return _flatpickr([this], config);
  };
}
var flatpickr = function(selector, config) {
  if (typeof selector === "string") {
    return _flatpickr(window.document.querySelectorAll(selector), config);
  } else if (selector instanceof Node) {
    return _flatpickr([selector], config);
  } else {
    return _flatpickr(selector, config);
  }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
  en: Object.assign({}, english),
  default: Object.assign({}, english)
};
flatpickr.localize = (l10n) => {
  flatpickr.l10ns.default = Object.assign(Object.assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = (config) => {
  flatpickr.defaultConfig = Object.assign(Object.assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
  jQuery.fn.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
}
Date.prototype.fp_incr = function(days) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
  window.flatpickr = flatpickr;
}
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedItem;
  let $$restProps = compute_rest_props($$props, [
    "items",
    "itemToString",
    "selectedIndex",
    "type",
    "direction",
    "size",
    "open",
    "inline",
    "light",
    "disabled",
    "titleText",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "label",
    "hideLabel",
    "translateWithId",
    "id",
    "name",
    "ref"
  ]);
  let { items = [] } = $$props;
  let { itemToString = (item) => item.text || item.id } = $$props;
  let { selectedIndex = -1 } = $$props;
  let { type = "default" } = $$props;
  let { direction = "bottom" } = $$props;
  let { size = void 0 } = $$props;
  let { open = false } = $$props;
  let { inline = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { titleText = "" } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { helperText = "" } = $$props;
  let { label = void 0 } = $$props;
  let { hideLabel = false } = $$props;
  let { translateWithId = void 0 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name: name2 = void 0 } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  let selectedId = void 0;
  let highlightedIndex = -1;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.itemToString === void 0 && $$bindings.itemToString && itemToString !== void 0)
    $$bindings.itemToString(itemToString);
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.titleText === void 0 && $$bindings.titleText && titleText !== void 0)
    $$bindings.titleText(titleText);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
    $$bindings.name(name2);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  selectedId = items[selectedIndex] ? items[selectedIndex].id : void 0;
  selectedItem = items[selectedIndex];
  {
    if (selectedIndex > -1) {
      dispatch("select", { selectedId, selectedIndex, selectedItem });
    }
  }
  inline = type === "inline";
  {
    if (!open) {
      highlightedIndex = -1;
    }
  }
  return `

<div${spread([escape_object($$restProps)], "bx--dropdown__wrapper bx--list-box__wrapper " + (inline ? "bx--dropdown__wrapper--inline" : "") + " " + (inline ? "bx--list-box__wrapper--inline" : "") + " " + (inline && invalid ? "bx--dropdown__wrapper--inline--invalid" : ""))}>${titleText ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${escape(titleText)}</label>` : ``}
  ${validate_component(ListBox, "ListBox").$$render($$result, {
    type,
    size,
    id,
    name: name2,
    "aria-label": $$props["aria-label"],
    class: "bx--dropdown " + (direction === "top" && "bx--list-box--up") + " " + (invalid && "bx--dropdown--invalid") + " " + (!invalid && warn && "bx--dropdown--warning") + " " + (open && "bx--dropdown--open") + "\n      " + (size === "sm" && "bx--dropdown--sm") + "\n      " + (size === "xl" && "bx--dropdown--xl") + "\n      " + (inline && "bx--dropdown--inline") + "\n      " + (disabled && "bx--dropdown--disabled") + "\n      " + (light && "bx--dropdown--light"),
    disabled,
    open,
    invalid,
    invalidText,
    light,
    warn,
    warnText
  }, {}, {
    default: () => `${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--list-box__invalid-icon" }, {}, {})}` : ``}
    ${!invalid && warn ? `${validate_component(WarningAltFilled16$1, "WarningAltFilled16").$$render($$result, {
      class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
    }, {}, {})}` : ``}
    <button tabindex="${"0"}" role="${"button"}"${add_attribute("aria-expanded", open, 0)} ${disabled ? "disabled" : ""}${add_attribute("translatewithid", translateWithId, 0)}${add_attribute("id", id, 0)}${add_classes(["bx--list-box__field"].join(" ").trim())}${add_attribute("this", ref, 0)}><span class="${"bx--list-box__label"}">${selectedItem ? `${escape(itemToString(selectedItem))}` : `${escape(label)}`}</span>
      ${validate_component(ListBoxMenuIcon, "ListBoxMenuIcon").$$render($$result, { open, translateWithId }, {}, {})}</button>
    ${open ? `${validate_component(ListBoxMenu, "ListBoxMenu").$$render($$result, { "aria-labelledby": id, id }, {}, {
      default: () => `${each(items, (item, i) => `${validate_component(ListBoxMenuItem, "ListBoxMenuItem").$$render($$result, {
        id: item.id,
        active: selectedIndex === i || selectedId === item.id,
        highlighted: highlightedIndex === i || selectedIndex === i
      }, {}, {
        default: () => `${escape(itemToString(item))}
          `
      })}`)}`
    })}` : ``}`
  })}
  ${!inline && !invalid && !warn && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}</div>`;
});
const ImageLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["src", "alt", "ratio", "loading", "loaded", "error", "fadeIn", "loadImage"]);
  let { src = "" } = $$props;
  let { alt = "" } = $$props;
  let { ratio = void 0 } = $$props;
  let { loading = false } = $$props;
  let { loaded = false } = $$props;
  let { error: error2 = false } = $$props;
  let { fadeIn = false } = $$props;
  const loadImage = (url) => {
    if (image != null)
      image = null;
    loaded = false;
    error2 = false;
    image = new Image();
    image.src = url || src;
    image.onload = () => loaded = true;
    image.onerror = () => error2 = true;
  };
  const dispatch = createEventDispatcher();
  let image = null;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.loaded === void 0 && $$bindings.loaded && loaded !== void 0)
    $$bindings.loaded(loaded);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  if ($$props.fadeIn === void 0 && $$bindings.fadeIn && fadeIn !== void 0)
    $$bindings.fadeIn(fadeIn);
  if ($$props.loadImage === void 0 && $$bindings.loadImage && loadImage !== void 0)
    $$bindings.loadImage(loadImage);
  loading = !loaded && !error2;
  {
    if (src && typeof window !== "undefined")
      loadImage();
  }
  {
    if (loaded)
      dispatch("load");
  }
  {
    if (error2)
      dispatch("error");
  }
  return `${ratio === void 0 ? `${loading ? `${slots.loading ? slots.loading({}) : ``}` : ``}
  ${loaded ? `<img${spread([
    escape_object($$restProps),
    {
      style: "width: 100%;" + escape($$restProps.style)
    },
    { src: escape_attribute_value(src) },
    { alt: escape_attribute_value(alt) }
  ])}>` : ``}
  ${error2 ? `${slots.error ? slots.error({}) : ``}` : ``}` : `${validate_component(AspectRatio, "AspectRatio").$$render($$result, { ratio }, {}, {
    default: () => `${loading ? `${slots.loading ? slots.loading({}) : ``}` : ``}
    ${loaded ? `<img${spread([
      escape_object($$restProps),
      {
        style: "width: 100%;" + escape($$restProps.style)
      },
      { src: escape_attribute_value(src) },
      { alt: escape_attribute_value(alt) }
    ])}>` : ``}
    ${error2 ? `${slots.error ? slots.error({}) : ``}` : ``}`
  })}`}`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "href", "inline", "icon", "disabled", "visited", "ref"]);
  let { size = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { inline = false } = $$props;
  let { icon = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { visited = false } = $$props;
  let { ref = null } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.visited === void 0 && $$bindings.visited && visited !== void 0)
    $$bindings.visited(visited);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `
${disabled ? `<p${spread([escape_object($$restProps)], "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : ""))}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}${!inline && icon ? `<div${add_classes(["bx--link__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}</p>` : `<a${spread([
    {
      rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    { href: escape_attribute_value(href) },
    escape_object($$restProps)
  ], "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : "") + " " + (size === "sm" ? "bx--link--sm" : "") + " " + (size === "lg" ? "bx--link--lg" : ""))}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}${!inline && icon ? `<div${add_classes(["bx--link__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}</a>`}`;
});
const EditOff16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let { class: className = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { focusable = false } = $$props;
  let { title = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `
<svg${spread([
    { "data-carbon-icon": "EditOff16" },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 32 32" },
    { fill: "currentColor" },
    { width: "16" },
    { height: "16" },
    { class: escape_attribute_value(className) },
    { preserveAspectRatio: "xMidYMid meet" },
    { style: escape_attribute_value(style) },
    { id: escape_attribute_value(id) },
    escape_object(attributes)
  ])}><path d="${"M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape(title)}</title>` : ``}
  `}</svg>`;
});
var EditOff16$1 = EditOff16;
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelId;
  let range;
  let left;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "max",
    "maxLabel",
    "min",
    "minLabel",
    "step",
    "stepMultiplier",
    "required",
    "inputType",
    "disabled",
    "light",
    "hideTextInput",
    "id",
    "invalid",
    "labelText",
    "name",
    "ref"
  ]);
  let { value = 0 } = $$props;
  let { max = 100 } = $$props;
  let { maxLabel = "" } = $$props;
  let { min = 0 } = $$props;
  let { minLabel = "" } = $$props;
  let { step = 1 } = $$props;
  let { stepMultiplier = 4 } = $$props;
  let { required = false } = $$props;
  let { inputType = "number" } = $$props;
  let { disabled = false } = $$props;
  let { light = false } = $$props;
  let { hideTextInput = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { invalid = false } = $$props;
  let { labelText = "" } = $$props;
  let { name: name2 = "" } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  let trackRef = null;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.maxLabel === void 0 && $$bindings.maxLabel && maxLabel !== void 0)
    $$bindings.maxLabel(maxLabel);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.minLabel === void 0 && $$bindings.minLabel && minLabel !== void 0)
    $$bindings.minLabel(minLabel);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.stepMultiplier === void 0 && $$bindings.stepMultiplier && stepMultiplier !== void 0)
    $$bindings.stepMultiplier(stepMultiplier);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.inputType === void 0 && $$bindings.inputType && inputType !== void 0)
    $$bindings.inputType(inputType);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.hideTextInput === void 0 && $$bindings.hideTextInput && hideTextInput !== void 0)
    $$bindings.hideTextInput(hideTextInput);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
    $$bindings.name(name2);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  labelId = `label-${id}`;
  range = max - min;
  {
    {
      if (value <= min) {
        value = min;
      } else if (value >= max) {
        value = max;
      }
      if (!disabled) {
        dispatch("change", value);
      }
    }
  }
  left = (value - min) / range * 100;
  return `


<div${spread([escape_object($$restProps)], "bx--form-item")}><label${add_attribute("for", id, 0)}${add_attribute("id", labelId, 0)}${add_classes(["bx--label " + (disabled ? "bx--label--disabled" : "")].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `
      ${escape(labelText)}
    `}</label>
  <div${add_classes(["bx--slider-container"].join(" ").trim())}><span${add_classes(["bx--slider__range-label"].join(" ").trim())}>${escape(minLabel || min)}</span>
    <div role="${"presentation"}" tabindex="${"-1"}"${add_classes(["bx--slider " + (disabled ? "bx--slider--disabled" : "")].join(" ").trim())}${add_attribute("this", ref, 0)}><div role="${"slider"}" tabindex="${"0"}" style="${"left: " + escape(left) + "%"}"${add_attribute("aria-labelledby", labelId, 0)}${add_attribute("aria-valuemax", max, 0)}${add_attribute("aria-valuemin", min, 0)}${add_attribute("aria-valuenow", value, 0)}${add_attribute("id", id, 0)}${add_classes(["bx--slider__thumb"].join(" ").trim())}></div>
      <div${add_classes(["bx--slider__track"].join(" ").trim())}${add_attribute("this", trackRef, 0)}></div>
      <div style="${"transform: translate(0, -50%) scaleX(" + escape(left / 100) + ")"}"${add_classes(["bx--slider__filled-track"].join(" ").trim())}></div>
      <input type="${"hidden"}"${add_attribute("name", name2, 0)}${add_attribute("value", value, 0)} ${required ? "required" : ""}${add_attribute("min", min, 0)}${add_attribute("max", max, 0)}${add_attribute("step", step, 0)}${add_classes(["bx--slider__input"].join(" ").trim())}></div>
    <span${add_classes(["bx--slider__range-label"].join(" ").trim())}>${escape(maxLabel || max)}</span>
    <input${add_attribute("type", hideTextInput ? "hidden" : inputType, 0)}${add_attribute("style", hideTextInput ? "display: none" : void 0, 0)} id="${"input-" + escape(id)}"${add_attribute("name", name2, 0)}${add_attribute("value", value, 0)}${add_attribute("aria-label", $$props["aria-label"] || "Slider number input", 0)} ${disabled ? "disabled" : ""} ${required ? "required" : ""}${add_attribute("min", min, 0)}${add_attribute("max", max, 0)}${add_attribute("step", step, 0)}${add_attribute("data-invalid", invalid || null, 0)}${add_attribute("aria-invalid", invalid || null, 0)}${add_classes([
    "bx--text-input bx--slider-text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "")
  ].join(" ").trim())}></div></div>`;
});
const TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "type",
    "placeholder",
    "light",
    "disabled",
    "helperText",
    "id",
    "name",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "ref",
    "required",
    "inline",
    "readonly"
  ]);
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { type = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name: name2 = void 0 } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { ref = null } = $$props;
  let { required = false } = $$props;
  let { inline = false } = $$props;
  let { readonly = false } = $$props;
  const ctx = getContext("Form");
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
    $$bindings.name(name2);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  isFluid = !!ctx && ctx.isFluid;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `
<div${add_classes([
    "bx--form-item bx--text-input-wrapper " + (inline ? "bx--text-input-wrapper--inline" : "") + " " + (light ? "bx--text-input-wrapper--light" : "") + " " + (readonly ? "bx--text-input-wrapper--readonly" : "")
  ].join(" ").trim())}>${inline ? `<div${add_classes(["bx--text-input__label-helper-wrapper"].join(" ").trim())}>${labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${slots.labelText ? slots.labelText({}) : `
            ${escape(labelText)}
          `}</label>` : ``}
      ${!isFluid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}</div>` : ``}
  ${!inline && labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>` : ``}
  <div${add_classes([
    "bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")
  ].join(" ").trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_attribute("data-warn", warn || void 0, 0)}${add_classes([
    "bx--text-input__field-wrapper " + (!invalid && warn ? "bx--text-input__field-wrapper--warning" : "")
  ].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16$1, "WarningFilled16").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled16$1, "WarningAltFilled16").$$render($$result, {
    class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
  }, {}, {})}` : ``}
      ${readonly ? `${validate_component(EditOff16$1, "EditOff16").$$render($$result, { class: "bx--text-input__readonly-icon" }, {}, {})}` : ``}
      <input${spread([
    {
      "data-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "aria-invalid": escape_attribute_value(invalid || void 0)
    },
    {
      "data-warn": escape_attribute_value(warn || void 0)
    },
    {
      "aria-describedby": escape_attribute_value(invalid ? errorId : warn ? warnId : void 0)
    },
    { disabled: disabled || null },
    { id: escape_attribute_value(id) },
    { name: escape_attribute_value(name2) },
    {
      placeholder: escape_attribute_value(placeholder)
    },
    { type: escape_attribute_value(type) },
    { value: escape_attribute_value(value) },
    { required: required || null },
    { readonly: readonly || null },
    escape_object($$restProps),
    {
      class: escape_attribute_value(size && `bx--text-input--${size}`)
    }
  ], "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warn" : ""))}${add_attribute("this", ref, 0)}>
      ${isFluid ? `<hr${add_classes(["bx--text-input__divider"].join(" ").trim())}>` : ``}
      ${isFluid && !inline && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
      ${isFluid && !inline && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div>
    ${!invalid && !warn && !isFluid && !inline && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape(helperText)}</div>` : ``}
    ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(invalidText)}</div>` : ``}
    ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
const Tile$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["light"]);
  let { light = false } = $$props;
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  return `
<div${spread([escape_object($$restProps)], "bx--tile " + (light ? "bx--tile--light" : ""))}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ClickableTile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["clicked", "light", "disabled", "href"]);
  let { clicked = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  if ($$props.clicked === void 0 && $$bindings.clicked && clicked !== void 0)
    $$bindings.clicked(clicked);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `${validate_component(Link, "Link").$$render($$result, Object.assign($$restProps, { disabled }, {
    class: "bx--tile bx--tile--clickable " + (clicked && "bx--tile--is-clicked") + " " + (light && "bx--tile--light") + " " + $$restProps.class
  }, { href }), {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
const ExpandableTile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "expanded",
    "light",
    "tileMaxHeight",
    "tilePadding",
    "tileCollapsedIconText",
    "tileExpandedIconText",
    "tileExpandedLabel",
    "tileCollapsedLabel",
    "tabindex",
    "id",
    "ref"
  ]);
  let { expanded = false } = $$props;
  let { light = false } = $$props;
  let { tileMaxHeight = 0 } = $$props;
  let { tilePadding = 0 } = $$props;
  let { tileCollapsedIconText = "Interact to expand Tile" } = $$props;
  let { tileExpandedIconText = "Interact to collapse Tile" } = $$props;
  let { tileExpandedLabel = "" } = $$props;
  let { tileCollapsedLabel = "" } = $$props;
  let { tabindex = "0" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  let refContent = null;
  let refAbove = null;
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.tileMaxHeight === void 0 && $$bindings.tileMaxHeight && tileMaxHeight !== void 0)
    $$bindings.tileMaxHeight(tileMaxHeight);
  if ($$props.tilePadding === void 0 && $$bindings.tilePadding && tilePadding !== void 0)
    $$bindings.tilePadding(tilePadding);
  if ($$props.tileCollapsedIconText === void 0 && $$bindings.tileCollapsedIconText && tileCollapsedIconText !== void 0)
    $$bindings.tileCollapsedIconText(tileCollapsedIconText);
  if ($$props.tileExpandedIconText === void 0 && $$bindings.tileExpandedIconText && tileExpandedIconText !== void 0)
    $$bindings.tileExpandedIconText(tileExpandedIconText);
  if ($$props.tileExpandedLabel === void 0 && $$bindings.tileExpandedLabel && tileExpandedLabel !== void 0)
    $$bindings.tileExpandedLabel(tileExpandedLabel);
  if ($$props.tileCollapsedLabel === void 0 && $$bindings.tileCollapsedLabel && tileCollapsedLabel !== void 0)
    $$bindings.tileCollapsedLabel(tileCollapsedLabel);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `
<button${spread([
    { type: "button" },
    { id: escape_attribute_value(id) },
    {
      "aria-expanded": escape_attribute_value(expanded)
    },
    {
      tabindex: escape_attribute_value(tabindex)
    },
    {
      title: escape_attribute_value(expanded ? tileExpandedIconText : tileCollapsedIconText)
    },
    escape_object($$restProps),
    {
      style: escape_attribute_value(expanded ? $$restProps.style : `${$$restProps.style}; max-height: ${tileMaxHeight + tilePadding}px`)
    }
  ], "bx--tile bx--tile--expandable " + (expanded ? "bx--tile--is-expanded" : "") + " " + (light ? "bx--tile--light" : ""))}${add_attribute("this", ref, 0)}><div${add_attribute("this", refContent, 0)}><div${add_classes(["bx--tile-content"].join(" ").trim())}${add_attribute("this", refAbove, 0)}><span${add_classes(["bx--tile-content__above-the-fold"].join(" ").trim())}>${slots.above ? slots.above({}) : ``}</span></div>
    <div${add_classes(["bx--tile__chevron"].join(" ").trim())}><span>${escape(expanded ? tileExpandedLabel : tileCollapsedLabel)}</span>
      ${validate_component(ChevronDown16$1, "ChevronDown16").$$render($$result, {}, {}, {})}</div>
    <div${add_classes(["bx--tile-content"].join(" ").trim())}><span${add_classes(["bx--tile-content__below-the-fold"].join(" ").trim())}>${slots.below ? slots.below({}) : ``}</span></div></div></button>`;
});
const Til = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let reddit = {
    image: "https://stayhipp.com/wp-content/uploads/2019/10/reddit.png",
    title: "fetching...",
    href: "#"
  };
  return `${validate_component(ClickableTile, "ClickableTile").$$render($$result, {
    href: reddit.href,
    class: "p0 \u0192-col \u2020j",
    style: "position: absolute;bottom: 1em;right: 11%;z-index: 10;width:350px;"
  }, {}, {
    default: () => `
    <p>${escape(reddit.title)} \u2192
    </p>`
  })}`;
});
var til = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Til
});
var suggestion_svelte_svelte_type_style_lang = "#autoComplete.svelte-1xniexi{width:calc(80vw - 1em);list-style-type:none}#autoComplete.svelte-1xniexi:empty{opacity:0}img.svelte-1xniexi{border-radius:2px;width:44px;height:44px;object-fit:contain;padding-right:7px}";
const css$f = {
  code: "#autoComplete.svelte-1xniexi{width:calc(80vw - 1em);list-style-type:none}#autoComplete.svelte-1xniexi:empty{opacity:0}img.svelte-1xniexi{border-radius:2px;width:44px;height:44px;object-fit:contain;padding-right:7px}",
  map: '{"version":3,"file":"suggestion.svelte","sources":["suggestion.svelte"],"sourcesContent":["<script>\\n    import { recommendations } from \\"./samurai\\";\\n    import { Tile } from \\"$hakama\\";\\n<\/script>\\n\\n<ul id=\\"autoComplete\\" class=\\"m-h-auto\\">\\n    {#each $recommendations as rec}\\n        <Tile style=\\"display:flex;\\">\\n            <img src={rec[3]?.zs || \\"https://i.imgur.com/drIqvV8.jpg\\"} alt=\\"\\" />\\n            <div class=\\"\u0192-col \u2206-ct\\">\\n                {#if rec[3]}\\n                    <div class=\\"fw7\\">{@html rec[3]?.zh || rec[0]}</div>\\n                    <span>{rec[3]?.zi || \\"\\"}</span>\\n                {:else}\\n                    <div class=\\"fw7\\">{@html rec[0]}</div>\\n                {/if}\\n            </div>\\n        </Tile>\\n    {/each}\\n</ul>\\n\\n<style type=\\"text/scss\\">#autoComplete {\\n  width: calc(80vw - 1em);\\n  list-style-type: none;\\n}\\n#autoComplete:empty {\\n  opacity: 0;\\n}\\n\\nimg {\\n  border-radius: 2px;\\n  width: 44px;\\n  height: 44px;\\n  object-fit: contain;\\n  padding-right: 7px;\\n}</style>\\n"],"names":[],"mappings":"AAqBwB,aAAa,eAAC,CAAC,AACrC,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACvB,eAAe,CAAE,IAAI,AACvB,CAAC,AACD,4BAAa,MAAM,AAAC,CAAC,AACnB,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,GAAG,eAAC,CAAC,AACH,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,AACpB,CAAC"}'
};
const Suggestion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $recommendations, $$unsubscribe_recommendations;
  $$unsubscribe_recommendations = subscribe(recommendations, (value) => $recommendations = value);
  $$result.css.add(css$f);
  $$unsubscribe_recommendations();
  return `<ul id="${"autoComplete"}" class="${"m-h-auto svelte-1xniexi"}">${each($recommendations, (rec) => `${validate_component(Tile$1, "Tile").$$render($$result, { style: "display:flex;" }, {}, {
    default: () => {
      var _a, _b, _c;
      return `<img${add_attribute("src", ((_a = rec[3]) == null ? void 0 : _a.zs) || "https://i.imgur.com/drIqvV8.jpg", 0)} alt="${""}" class="${"svelte-1xniexi"}">
            <div class="${"\u0192-col \u2206-ct"}">${rec[3] ? `<div class="${"fw7"}"><!-- HTML_TAG_START -->${((_b = rec[3]) == null ? void 0 : _b.zh) || rec[0]}<!-- HTML_TAG_END --></div>
                    <span>${escape(((_c = rec[3]) == null ? void 0 : _c.zi) || "")}</span>` : `<div class="${"fw7"}"><!-- HTML_TAG_START -->${rec[0]}<!-- HTML_TAG_END --></div>`}</div>
        `;
    }
  })}`)}
</ul>`;
});
var suggestion = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Suggestion
});
var index_svelte_svelte_type_style_lang$3 = "section.svelte-o9rk4w.svelte-o9rk4w{justify-content:center;align-items:center;background:url(https://api.nukes.in/data/NASA/img) center center no-repeat;background-size:cover;position:relative;height:100vh;z-index:1}form.svelte-o9rk4w.svelte-o9rk4w{justify-content:center;width:calc(80vw - 0.8em);background:#262626;font-size:1.25rem}form.svelte-o9rk4w img.svelte-o9rk4w{width:1.5em;height:1.5em;border-radius:5px;color:#fff}";
const css$e = {
  code: "section.svelte-o9rk4w.svelte-o9rk4w{justify-content:center;align-items:center;background:url(https://api.nukes.in/data/NASA/img) center center no-repeat;background-size:cover;position:relative;height:100vh;z-index:1}form.svelte-o9rk4w.svelte-o9rk4w{justify-content:center;width:calc(80vw - 0.8em);background:#262626;font-size:1.25rem}form.svelte-o9rk4w img.svelte-o9rk4w{width:1.5em;height:1.5em;border-radius:5px;color:#fff}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n  import { base } from \\"$app/paths\\";\\n  import { engine, preprocessor, recommendations } from \\"./command/samurai\\";\\n  import { TextInput } from \\"$hakama\\";\\n\\n  import TIL from \\"./command/til.svelte\\";\\n  import Recoms from \\"./command/suggestion.svelte\\";\\n  import { onMount } from \\"svelte\\";\\n\\n  let value;\\n\\n  const go = (e) => {\\n    const send = engine(value);\\n    let recs = $recommendations.map((e) => e[3]?.zh || e[0]);\\n\\n    const div = document.createElement(\\"div\\");\\n    div.innerHTML = recs.join(\\"&&\\");\\n    recs = div.innerText.split(\\"&&\\");\\n\\n    switch (e.keyCode) {\\n      case 40:\\n        value = `!${send.key} ${recs[0]}`;\\n        break;\\n      case 38:\\n        value = `!${send.key} ${recs[1]}`;\\n        break;\\n      case 13:\\n        window.location.href = preprocessor(send);\\n        break;\\n    }\\n    return send;\\n  };\\n\\n  onMount(() => setInterval(\u0192(\\"#rsc\\").focus(), 1e3));\\n<\/script>\\n\\n<svelte:head>\\n  <link rel=\\"preconnect\\" href=\\"https://api.nukes.in/\\" />\\n  <link rel=\\"preload\\" href=\\"https://api.nukes.in/data/NASA/img\\" as=\\"image\\" />\\n  <link rel=\\"preconnect\\" href=\\"https://web.whatsapp.com/\\" />\\n  <link rel=\\"preconnect\\" href=\\"https://en.wikipedia.org/\\" />\\n  <link rel=\\"preconnect\\" href=\\"https://github.com\\" />\\n  <link rel=\\"prefetch\\" href=\\"{base}/stream\\" />\\n  <link rel=\\"prefetch\\" href=\\"{base}/notes\\" />\\n</svelte:head>\\n\\n<TIL />\\n\\n<section class=\\"\u0192-col\\">\\n  <form class=\\"\u0192 p5\\" on:submit|preventDefault>\\n    <img class=\\"m5\\" id=\\"engineImage\\" src=\\"{base}/icons/Basic.svg\\" alt=\\"\\" />\\n    <TextInput\\n      on:keyup={go}\\n      bind:value\\n      id=\\"rsc\\"\\n      hideLabel\\n      placeholder=\\"Ronin\\"\\n      style=\\"outline:none;\\"\\n    />\\n  </form>\\n  {#if value && $recommendations.length}\\n    <Recoms />\\n  {/if}\\n</section>\\n\\n<style type=\\"text/scss\\">section {\\n  justify-content: center;\\n  align-items: center;\\n  background: url(https://api.nukes.in/data/NASA/img) center center no-repeat;\\n  background-size: cover;\\n  position: relative;\\n  height: 100vh;\\n  z-index: 1;\\n}\\n\\nform {\\n  justify-content: center;\\n  width: calc(80vw - 0.8em);\\n  background: #262626;\\n  font-size: 1.25rem;\\n}\\nform img {\\n  width: 1.5em;\\n  height: 1.5em;\\n  border-radius: 5px;\\n  color: #fff;\\n}</style>\\n"],"names":[],"mappings":"AAiEwB,OAAO,4BAAC,CAAC,AAC/B,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,kCAAkC,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,SAAS,CAC3E,eAAe,CAAE,KAAK,CACtB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,IAAI,4BAAC,CAAC,AACJ,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC,CACzB,UAAU,CAAE,OAAO,CACnB,SAAS,CAAE,OAAO,AACpB,CAAC,AACD,kBAAI,CAAC,GAAG,cAAC,CAAC,AACR,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,AACb,CAAC"}'
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $recommendations, $$unsubscribe_recommendations;
  $$unsubscribe_recommendations = subscribe(recommendations, (value2) => $recommendations = value2);
  let value;
  $$result.css.add(css$e);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<link rel="${"preconnect"}" href="${"https://api.nukes.in/"}" data-svelte="svelte-1u7m5oz"><link rel="${"preload"}" href="${"https://api.nukes.in/data/NASA/img"}" as="${"image"}" data-svelte="svelte-1u7m5oz"><link rel="${"preconnect"}" href="${"https://web.whatsapp.com/"}" data-svelte="svelte-1u7m5oz"><link rel="${"preconnect"}" href="${"https://en.wikipedia.org/"}" data-svelte="svelte-1u7m5oz"><link rel="${"preconnect"}" href="${"https://github.com"}" data-svelte="svelte-1u7m5oz"><link rel="${"prefetch"}" href="${escape(base) + "/stream"}" data-svelte="svelte-1u7m5oz"><link rel="${"prefetch"}" href="${escape(base) + "/notes"}" data-svelte="svelte-1u7m5oz">`, ""}

${validate_component(Til, "TIL").$$render($$result, {}, {}, {})}

<section class="${"\u0192-col svelte-o9rk4w"}"><form class="${"\u0192 p5 svelte-o9rk4w"}"><img class="${"m5 svelte-o9rk4w"}" id="${"engineImage"}" src="${escape(base) + "/icons/Basic.svg"}" alt="${""}">
    ${validate_component(TextInput, "TextInput").$$render($$result, {
      id: "rsc",
      hideLabel: true,
      placeholder: "Ronin",
      style: "outline:none;",
      value
    }, {
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}</form>
  ${value && $recommendations.length ? `${validate_component(Suggestion, "Recoms").$$render($$result, {}, {}, {})}` : ``}
</section>`;
  } while (!$$settled);
  $$unsubscribe_recommendations();
  return $$rendered;
});
var index$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var shows = [
  {
    day: "7/30/2021",
    name: "Feels like Ishq",
    till: {
      season: 1,
      episode: 6
    },
    release: 2021,
    state: -1,
    type: "Live"
  },
  {
    day: "7/31/2021",
    name: "How to Sell Drugs Online (Fast)",
    till: {
      season: 3,
      episode: 6
    },
    release: 2020,
    state: 0.25,
    type: "Live"
  },
  {
    day: "7/29/2021",
    name: "The Grand Tour",
    till: {
      season: 4,
      episode: 2
    },
    release: 2016,
    state: 0.5,
    type: "Live"
  },
  {
    day: "7/25/2021",
    name: "W/ Bob & David",
    till: {
      season: 1,
      episode: 5
    },
    release: 2015,
    state: 1,
    type: "Live"
  },
  {
    day: "7/14/2021",
    name: "Loki",
    till: {
      season: 1,
      episode: 6
    },
    release: 2021,
    state: 0.5,
    type: "CGI"
  },
  {
    day: "7/13/2021",
    name: "Ray",
    till: {
      season: 1,
      episode: 4
    },
    release: 2021,
    state: 0.25,
    type: "Live"
  },
  {
    day: "7/12/2021",
    name: "How to Become a Tyrant",
    till: {
      season: 1,
      episode: 6
    },
    release: 2021,
    state: 1,
    type: "Live"
  },
  {
    day: "6/17/2021",
    name: "Violet Evergarden",
    till: {
      season: 1,
      episode: 14
    },
    release: 2018,
    state: 0.25,
    type: "Anime"
  },
  {
    day: "6/16/2021",
    name: "Spycraft",
    till: {
      season: 1,
      episode: 8
    },
    release: 2021,
    state: 1,
    type: "Live"
  },
  {
    day: "6/11/2021",
    name: "Lupin",
    till: {
      season: 2,
      episode: 5
    },
    release: 2021,
    state: 0.5,
    type: "Live"
  },
  {
    day: "6/20/2021",
    name: "Demon Slayer",
    release: 2019,
    till: {
      season: 2,
      episode: 27
    },
    state: 0.5,
    type: "Anime"
  },
  {
    day: "6/6/2021",
    name: "Kabaneri of Iron Fortress",
    comments: "Till battle of Unato, i.e EP13=Movie",
    till: {
      season: 1,
      episode: 13
    },
    release: 2016,
    state: 0.25,
    type: "Anime"
  },
  {
    day: "5/29/2021",
    name: "Lucifer",
    till: {
      season: 5,
      episode: 16
    },
    release: 2016,
    state: 0.5,
    type: "CGI"
  },
  {
    day: "5/25/2021",
    name: "State of the Union",
    comment: "Rosamund Pike",
    till: {
      season: 1,
      episode: 10
    },
    release: 2019,
    state: 0.5,
    type: "Live"
  },
  {
    day: "5/24/2021",
    name: "Marvel's Helstrom",
    till: {
      season: 1,
      episode: 10
    },
    release: 2020,
    state: -1,
    type: "CGI"
  },
  {
    day: "5/21/2021",
    name: "Young Sheldon",
    till: {
      season: 4,
      episode: 18
    },
    release: 2017,
    state: 0.5,
    type: "Live"
  },
  {
    day: "5/20/2021",
    name: "Alma Matters",
    till: {
      season: 1,
      episode: 3
    },
    release: 2021,
    state: 1,
    type: "Live"
  },
  {
    day: "5/19/2021",
    name: "The Millionaire Detective",
    till: {
      season: 1,
      episode: 11
    },
    release: 2020,
    state: 0.5,
    type: "Anime"
  },
  {
    day: "5/17/2021",
    name: "Love, Death & Robots",
    till: {
      season: 2,
      episode: 8
    },
    release: 2019,
    state: 0.5,
    type: "Cartoon"
  },
  {
    day: "5/1/2021",
    name: "LOL - Hasse toh Phasse",
    till: {
      season: 1,
      episode: 6
    },
    release: 2021,
    state: 1,
    type: "Live"
  },
  {
    day: "5/1/2021",
    name: "Invincible",
    comments: "Superhero",
    till: {
      season: 1,
      episode: 8
    },
    release: 2021,
    state: 0.25,
    type: "Cartoon"
  },
  {
    day: "4/23/2021",
    name: "The Falcon and The Winter Soldier",
    release: 2021,
    till: {
      season: 1,
      episode: 6
    },
    state: 0.25,
    type: "CGI"
  },
  {
    day: "4/18/2021",
    name: "100 Humans",
    till: {
      season: 1,
      episode: 8
    },
    release: 2020,
    state: 1,
    type: "Live"
  },
  {
    day: "3/30/2021",
    name: "Snowpiercer",
    till: {
      season: 2,
      episode: 10
    },
    release: 2020,
    state: 0.5,
    type: "Live"
  },
  {
    day: "3/29/2021",
    name: "Formula 1: Drive to Survive",
    release: 2019,
    state: 0.5,
    type: "Live"
  },
  {
    day: "3/29/2021",
    name: "Ultraman",
    release: 2019,
    state: 0.5,
    type: "Anime"
  },
  {
    day: "3/24/2021",
    name: "Cosmos",
    release: 2014,
    state: 0.25,
    type: "CGI"
  },
  {
    day: "3/6/2021",
    name: "WandaVision",
    release: 2021,
    till: {
      season: 1,
      episode: 9
    },
    state: 0.25,
    type: "CGI"
  },
  {
    day: "2/12/2021",
    name: "Bonding",
    release: 2019,
    state: -1,
    comment: "WHY IS THIS CANCELLED???",
    type: "Live"
  },
  {
    day: "1/30/2021",
    name: "Don't Fuck with Cats",
    release: 2019,
    state: 1,
    type: "Live"
  },
  {
    day: "1/29/2021",
    name: "Chilling Adventures of Sabrina",
    release: 2018,
    state: 1,
    type: "CGI"
  },
  {
    day: "1/21/2021",
    name: "Giri/Haji",
    release: 2019,
    state: -1,
    comment: "WHY IS THIS CANCELLED???",
    type: "Live"
  },
  {
    day: "1/9/2021",
    name: "Star Trek Discovery",
    release: 2020,
    state: 0.5,
    type: "CGI"
  },
  {
    day: "1/6/2021",
    name: "History of Swear Words",
    release: 2020,
    state: 0.25,
    type: "Live"
  },
  {
    day: "3/27/2021",
    name: "Dr Stone",
    release: 2019,
    till: {
      season: 2,
      episode: 11
    },
    state: 0.5,
    type: "Anime"
  },
  {
    day: "1/3/2021",
    name: "Cobra Kai",
    release: 2020,
    state: 0.5,
    type: "Live"
  },
  {
    day: "12/18/2020",
    name: "Schulz Saves America",
    release: 2020,
    state: -0.5,
    type: "Live"
  },
  {
    day: "12/16/2020",
    name: "Biohackers",
    release: 2020,
    state: -0.5,
    type: "Live"
  },
  {
    day: "12/15/2020",
    name: "Alice In Borderland",
    release: 2020,
    state: 0.5,
    type: "CGI"
  },
  {
    day: "12/9/2020",
    name: "Mr. Iglesias",
    release: 2019,
    state: 0.25,
    type: "Live"
  },
  {
    day: "11/13/2020",
    name: "Shinya Shokudo",
    release: 2009,
    state: 0.25,
    type: "Live"
  },
  {
    day: "11/4/2020",
    name: "Mouse M.D.",
    release: 2004,
    state: 1,
    type: "Live"
  },
  {
    day: "10/28/2020",
    name: "The Queen's Gambit",
    release: 2020,
    state: 1,
    type: "Live"
  },
  {
    day: "10/24/2020",
    name: "Mirzapur",
    release: 2018,
    state: 0.5,
    type: "Live"
  },
  {
    day: "10/19/2020",
    name: "Inside Bill's Brain",
    release: 2019,
    state: 1,
    type: "Live"
  },
  {
    day: "10/7/2020",
    name: "Bad Boy Billionaires: India",
    release: 2020,
    state: -1,
    type: "Live"
  },
  {
    day: "9/21/2020",
    name: "The Midnight Gospel",
    release: 2020,
    state: 0.25,
    type: "Cartoon"
  },
  {
    day: "9/19/2020",
    name: "Criminal: UK",
    release: 2019,
    state: 0.25,
    type: "Live"
  },
  {
    day: "9/12/2020",
    name: "Maniac: Limited Series",
    release: 2018,
    state: 1,
    type: "Live"
  },
  {
    day: "9/12/2020",
    name: "Shokugeki no Soma",
    release: 2016,
    state: 1,
    type: "Anime"
  },
  {
    day: "9/8/2020",
    name: "Broadchurch",
    release: 2013,
    state: 1,
    type: "Live"
  },
  {
    day: "9/8/2020",
    name: "After Life",
    release: 2019,
    state: 0.5,
    type: "Live"
  },
  {
    day: "8/12/2020",
    name: "Agents of S.H.I.E.L.D.",
    release: 2013,
    state: 1,
    type: "CGI"
  },
  {
    day: "8/11/2020",
    name: "Car Masters: Rust to Riches",
    release: 2018,
    state: -1,
    type: "Live"
  },
  {
    day: "8/5/2020",
    name: "Sex Education",
    release: 2019,
    state: 0.5,
    type: "Live"
  },
  {
    day: "8/4/2020",
    name: "The Umbrella Academy",
    release: 2019,
    state: 0.5,
    type: "CGI"
  },
  {
    day: "7/23/2020",
    name: "Blindspot",
    release: 2015,
    state: 1,
    type: "Live"
  },
  {
    day: "7/5/2020",
    name: "Dark",
    release: 2017,
    state: 1,
    type: "Live"
  },
  {
    day: "7/3/2020",
    name: "Patriot Act with Hasan Minhaj",
    release: 2018,
    state: -1,
    type: "Anime"
  },
  {
    day: "6/11/2020",
    name: "Baki",
    release: 2018,
    till: {
      season: 3,
      episode: 24
    },
    state: 0.5,
    type: "Anime"
  },
  {
    day: "6/16/2020",
    name: "How to Get Away with Murder",
    release: 2014,
    state: 1,
    type: "Live"
  },
  {
    day: "6/1/2020",
    name: "Rick and Morty",
    release: 2013,
    till: {
      season: 4,
      episode: 10
    },
    state: 1,
    type: "Cartoon"
  },
  {
    day: "5/23/2020",
    name: "Overlord",
    release: 2015,
    state: 1,
    type: "Anime"
  },
  {
    day: "5/5/2020",
    name: "Kuroko's Basketball",
    release: 2015,
    state: 1,
    type: "Anime"
  },
  {
    day: "4/26/2020",
    name: "Hasmukh",
    release: 2020,
    state: 0.5,
    type: "Live"
  },
  {
    day: "4/10/2020",
    name: "Mob Psycho 100",
    release: 2016,
    state: 0.25,
    type: "Anime"
  },
  {
    day: "4/7/2020",
    name: "The Magicians",
    release: 2015,
    state: 1,
    type: "CGI"
  },
  {
    day: "4/3/2020",
    name: "Money Heist",
    release: 2017,
    state: 0.5,
    type: "Live"
  },
  {
    day: "3/16/2020",
    name: "Altered Carbon",
    release: 2018,
    state: -1,
    type: "CGI"
  },
  {
    day: "2/19/2020",
    name: "Narcos",
    release: 2015,
    state: -1,
    type: "Live"
  },
  {
    day: "2/15/2020",
    name: "BoJack Horseman",
    release: 2014,
    state: 1,
    type: "Cartoon"
  },
  {
    day: "1/29/2020",
    name: "Stranger Things",
    release: 2016,
    state: 0.5,
    type: "CGI"
  },
  {
    day: "1/29/2020",
    name: "Arrow",
    release: 2012,
    state: 1,
    type: "CGI"
  },
  {
    day: "1/17/2020",
    name: "How I Met Your Mother",
    release: 2005,
    state: 1,
    type: "Live"
  },
  {
    day: "1/6/2020",
    name: "Lost in Space",
    release: 2018,
    state: 0.5,
    type: "CGI"
  },
  {
    day: "12/25/2019",
    name: "Made in Heaven",
    release: 2019,
    state: 0.5,
    type: "Live"
  },
  {
    day: "12/22/2019",
    name: "Mr Robot",
    release: 2015,
    state: 1,
    type: "Live"
  },
  {
    day: "11/21/2019",
    name: "Black Mirror",
    release: 2011,
    state: 0.25,
    type: "CGI"
  },
  {
    day: "12/4/2019",
    name: "Final Space",
    release: 2018,
    till: {
      season: 2,
      episode: 13
    },
    state: 0.75,
    type: "Cartoon"
  },
  {
    day: "11/20/2019",
    name: "The End of the F***ing World",
    release: 2017,
    state: -1,
    type: "Live"
  },
  {
    day: "11/18/2019",
    name: "Limitless",
    release: 2015,
    state: -1,
    type: "Live"
  },
  {
    day: "11/12/2019",
    name: "The Spy",
    release: 2019,
    state: 1,
    type: "Live"
  },
  {
    day: "10/28/2019",
    name: "The IT Crowd",
    release: 2006,
    state: -1,
    type: "Live"
  },
  {
    day: "10/26/2019",
    name: "Fairy Tail",
    release: 2009,
    state: 1,
    type: "Anime"
  },
  {
    day: "9/19/2019",
    name: "The Night Manager",
    release: 2016,
    state: 1,
    type: "Live"
  },
  {
    day: "9/25/2019",
    name: "Suits",
    release: 2011,
    state: 1,
    type: "Live"
  },
  {
    day: "9/9/2019",
    name: "Designated Survivor",
    release: 2016,
    state: 1,
    type: "Live"
  },
  {
    day: "8/17/2019",
    name: "Sacred Games",
    release: 2018,
    state: 1,
    type: "Live"
  },
  {
    day: "8/15/2019",
    name: "Krypton",
    release: 2018,
    state: -1,
    type: "CGI"
  },
  {
    day: "8/12/2019",
    name: "Legion",
    release: 2017,
    state: 1,
    type: "CGI"
  },
  {
    day: "8/6/2019",
    name: "The Big Bang Theory",
    release: 2007,
    state: 1,
    type: "Live"
  },
  {
    day: "7/11/2019",
    name: "House of Cards",
    release: 2013,
    state: 1,
    type: "Live"
  },
  {
    day: "7/6/2019",
    name: "Kakegurui",
    release: 2018,
    state: 0.25,
    type: "Anime"
  },
  {
    day: "6/25/2019",
    name: "Marvel's Jessica Jones",
    release: 2015,
    state: -1,
    type: "CGI"
  },
  {
    day: "6/23/2019",
    name: "Friends",
    release: 1994,
    state: -1,
    type: "Live"
  },
  {
    day: "6/8/2018",
    name: "Sense8",
    release: 2015,
    state: -1,
    type: "Live"
  },
  {
    day: "6/3/2018",
    name: "Chernobyl",
    release: 2019,
    state: 1,
    type: "Live"
  },
  {
    day: "5/19/2019",
    name: "Game of Thrones",
    release: 2011,
    state: 1,
    type: "CGI"
  },
  {
    day: "2/28/2019",
    name: "The Gifted",
    release: 2017,
    state: -1,
    type: "CGI"
  },
  {
    day: "1/18/2019",
    name: "Marvel's The Punisher",
    release: 2018,
    state: -1,
    type: "CGI"
  },
  {
    day: "1/3/2019",
    name: "A Series of Unfortunate Events",
    release: 2017,
    state: 1,
    type: "Live"
  },
  {
    day: "3/3/2018",
    name: "12 Monkeys",
    release: 2012,
    state: 1,
    type: "CGI"
  },
  {
    day: "1/16/2017",
    name: "Sherlock",
    release: 2010,
    state: 0.5,
    type: "Live"
  },
  {
    day: "10/9/2015",
    name: "Continuum",
    release: 2012,
    state: 1,
    type: "CGI"
  },
  {
    day: "9/23/2014",
    name: "Hunter x Hunter",
    release: 2011,
    state: -1,
    type: "Anime"
  },
  {
    day: "10/13/2015",
    name: "Agatha Christie's Poirot",
    release: 1989,
    state: 1,
    type: "Live"
  },
  {
    day: "2020",
    name: "Silicon Valley",
    release: 2016,
    state: 1,
    type: "Live"
  },
  {
    day: "2019",
    name: "K-On",
    release: 2009,
    state: 1,
    type: "Anime"
  },
  {
    day: "2019",
    name: "Deception",
    release: 2018,
    state: -1,
    type: "CGI"
  },
  {
    day: "2019",
    name: "Daredevil",
    release: 2015,
    state: -1,
    type: "CGI"
  },
  {
    day: "2019",
    name: "Iron Fist",
    release: 2017,
    state: -1,
    type: "CGI"
  },
  {
    day: "2019",
    name: "Tokyo Ghoul",
    release: 2015,
    state: 1,
    type: "Anime"
  },
  {
    day: "2019",
    name: "Jessica Jones",
    release: 2015,
    state: -1,
    type: "CGI"
  },
  {
    day: "2019",
    name: "Scorpion",
    release: 2014,
    state: -1,
    type: "Live"
  },
  {
    day: "2018",
    name: "Hannibal",
    release: 2013,
    state: 1,
    type: "Live"
  },
  {
    day: "2018",
    name: "Magi",
    release: 2012,
    state: -1,
    type: "Anime"
  },
  {
    day: "2018",
    name: "Danganronpa",
    release: 2013,
    state: 1,
    type: "Anime"
  },
  {
    day: "2018",
    name: "Inhumans",
    release: 2017,
    state: -1,
    type: "CGI"
  },
  {
    day: "2018",
    name: "The Defenders",
    release: 2017,
    state: -1,
    type: "CGI"
  },
  {
    day: "2017",
    name: "Mekakucity Actors",
    release: 2014,
    state: 0.5,
    type: "Anime"
  },
  {
    day: "2017",
    name: "Black Bullet",
    release: 2014,
    state: 1,
    type: "Anime"
  },
  {
    day: "2017",
    name: "No Game No Life",
    release: 2014,
    state: -1,
    type: "Anime"
  },
  {
    day: "2017",
    name: "Yuri on Ice",
    release: 2016,
    state: 1,
    type: "Anime"
  },
  {
    day: "2017",
    name: "God Eater",
    release: 2015,
    state: 0,
    type: "Anime"
  },
  {
    day: "2017",
    name: "Aldnoah.Zero",
    release: 2014,
    state: 1,
    type: "Anime"
  },
  {
    day: "2017",
    name: "Arslan Senki",
    till: {
      season: 2,
      episode: 8,
      last_update_check: "6/6/2021"
    },
    state: 0.25,
    type: "Anime"
  },
  {
    day: "2017",
    name: "Parasyte",
    release: 2014,
    state: 1,
    type: "Anime"
  },
  {
    day: "2017",
    name: "K",
    release: 2012,
    till: {
      season: 3,
      episode: 13
    },
    state: 0.75,
    type: "Anime"
  },
  {
    day: "2017",
    name: "Orange",
    release: 2016,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Assassination Classroom",
    release: 2013,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Noragami",
    release: 2014,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Charlotte",
    release: 2015,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Angel Beats",
    release: 2010,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Bunny Drop",
    release: 2011,
    state: -1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Kill la Kill",
    release: 2013,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Akame ga Kill",
    release: 2014,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Breaking Bad",
    release: 2008,
    state: 1,
    type: "Live Action"
  },
  {
    day: "2016",
    name: "Tokyo Magnitude 8.0",
    release: 2008,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Anohana",
    release: 2011,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Mushi-Shi",
    release: 2005,
    state: 1,
    type: "Anime"
  },
  {
    day: "2016",
    name: "Death Parade",
    release: 2015,
    state: 1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Strike the Blood",
    release: 2013,
    till: {
      season: 1,
      episode: 24
    },
    state: 0.75,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Ouran High School Host Club",
    release: 2006,
    state: -1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Serial Experiments Lain",
    release: 1998,
    state: 1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Elfen Lied",
    release: 2004,
    state: -1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Shigatsu wa Kimi no Uso",
    release: 2014,
    state: 1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Terror in Resonance",
    release: 2014,
    state: 1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Mirai Nikki",
    release: 2011,
    state: 1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Fullmetal Alchemist: Brotherhood",
    release: 2009,
    state: 1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Code Geass",
    release: 2006,
    state: 1,
    type: "Anime"
  },
  {
    day: "2015",
    name: "Death Note",
    release: 2007,
    state: 1,
    type: "Anime"
  }
];
var show_svelte_svelte_type_style_lang = '.card.svelte-xoaitx.svelte-xoaitx{margin:15px auto;height:17em;max-width:51em;flex:1 1 auto;display:flex}.card.svelte-xoaitx img.svelte-xoaitx{height:100%;max-width:22.1em;flex:1 1 auto}.card-body.svelte-xoaitx.svelte-xoaitx{width:12em;max-height:100%;flex:1 1 auto;flex-flow:column nowrap;padding:1.25em}.card-body.svelte-xoaitx .button.svelte-xoaitx{margin-top:auto;font-size:0.9em;color:#aaa;border-radius:2px}.card-text.svelte-xoaitx.svelte-xoaitx{position:relative;flex:1;overflow:hidden;text-overflow:ellipsis;padding:0}.card-text.svelte-xoaitx h3.svelte-xoaitx,.card-text.svelte-xoaitx h5.svelte-xoaitx{margin-top:0}.card-text.svelte-xoaitx.svelte-xoaitx:after{position:absolute;bottom:0;content:"";width:100%;height:2.8em;background:linear-gradient(#4440, #444)}';
const css$d = {
  code: '.card.svelte-xoaitx.svelte-xoaitx{margin:15px auto;height:17em;max-width:51em;flex:1 1 auto;display:flex}.card.svelte-xoaitx img.svelte-xoaitx{height:100%;max-width:22.1em;flex:1 1 auto}.card-body.svelte-xoaitx.svelte-xoaitx{width:12em;max-height:100%;flex:1 1 auto;flex-flow:column nowrap;padding:1.25em}.card-body.svelte-xoaitx .button.svelte-xoaitx{margin-top:auto;font-size:0.9em;color:#aaa;border-radius:2px}.card-text.svelte-xoaitx.svelte-xoaitx{position:relative;flex:1;overflow:hidden;text-overflow:ellipsis;padding:0}.card-text.svelte-xoaitx h3.svelte-xoaitx,.card-text.svelte-xoaitx h5.svelte-xoaitx{margin-top:0}.card-text.svelte-xoaitx.svelte-xoaitx:after{position:absolute;bottom:0;content:"";width:100%;height:2.8em;background:linear-gradient(#4440, #444)}',
  map: '{"version":3,"file":"show.svelte","sources":["show.svelte"],"sourcesContent":["<script>\\n    import { getShows } from \\"./components/functions\\";\\n    import shows from \\"../../../../config/database/multiple.json\\";\\n\\n    const TODAY = +Date.now();\\n\\n    const options = {\\n        weekday: \\"short\\",\\n        year: \\"numeric\\",\\n        month: \\"short\\",\\n        day: \\"numeric\\",\\n    };\\n    const cleanDate = (dt) => new Date(dt).toLocaleString(\\"en-GB\\", options);\\n\\n    const show_filter = (e) => {\\n        if (e.state < 0.5 || e.state === 1) return 0;\\n        const time_difference = (TODAY - +new Date(e.day)) / 864e5;\\n        return 1;\\n    };\\n\\n    const filtered_list = shows.filter(show_filter);\\n\\n    let shows_promise = getShows(filtered_list);\\n<\/script>\\n\\n{#await shows_promise}\\n    <div class=\\"p20\\">Fetching...</div>\\n{:then response}\\n    {#each response as show}\\n        <div class=\\"card\\">\\n            <img src={show.image} alt={show.name} />\\n            <div class=\\"card-body \u0192\\">\\n                <div class=\\"card-text\\">\\n                    <h3>{show.name}</h3>\\n                    <h5>{show.ep}</h5>\\n                    {@html show.abt}\\n                </div>\\n                <div class=\\"button\\">\\n                    Released: {cleanDate(show.airstamp)} <br />\\n                    Last Seen: {cleanDate(show.last_seen)}\\n                </div>\\n            </div>\\n        </div>\\n        <hr class=\\"w-50\\" />\\n    {/each}\\n{/await}\\n\\n<style type=\\"text/scss\\">.card {\\n  margin: 15px auto;\\n  height: 17em;\\n  max-width: 51em;\\n  flex: 1 1 auto;\\n  display: flex;\\n}\\n.card img {\\n  height: 100%;\\n  max-width: 22.1em;\\n  flex: 1 1 auto;\\n}\\n\\n.card-body {\\n  width: 12em;\\n  max-height: 100%;\\n  flex: 1 1 auto;\\n  flex-flow: column nowrap;\\n  padding: 1.25em;\\n}\\n.card-body .button {\\n  margin-top: auto;\\n  font-size: 0.9em;\\n  color: #aaa;\\n  border-radius: 2px;\\n}\\n\\n.card-text {\\n  position: relative;\\n  flex: 1;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n  padding: 0;\\n}\\n.card-text h3,\\n.card-text h5 {\\n  margin-top: 0;\\n}\\n.card-text:after {\\n  position: absolute;\\n  bottom: 0;\\n  content: \\"\\";\\n  width: 100%;\\n  height: 2.8em;\\n  background: linear-gradient(#4440, #444);\\n}</style>\\n"],"names":[],"mappings":"AA+CwB,KAAK,4BAAC,CAAC,AAC7B,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,CACf,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,AACf,CAAC,AACD,mBAAK,CAAC,GAAG,cAAC,CAAC,AACT,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,MAAM,CACjB,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,AAChB,CAAC,AAED,UAAU,4BAAC,CAAC,AACV,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,CAChB,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CACd,SAAS,CAAE,MAAM,CAAC,MAAM,CACxB,OAAO,CAAE,MAAM,AACjB,CAAC,AACD,wBAAU,CAAC,OAAO,cAAC,CAAC,AAClB,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,AACpB,CAAC,AAED,UAAU,4BAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,wBAAU,CAAC,gBAAE,CACb,wBAAU,CAAC,EAAE,cAAC,CAAC,AACb,UAAU,CAAE,CAAC,AACf,CAAC,AACD,sCAAU,MAAM,AAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,gBAAgB,KAAK,CAAC,CAAC,IAAI,CAAC,AAC1C,CAAC"}'
};
const Show = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const TODAY = +Date.now();
  const options2 = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  const cleanDate = (dt) => new Date(dt).toLocaleString("en-GB", options2);
  const show_filter = (e) => {
    if (e.state < 0.5 || e.state === 1)
      return 0;
    (TODAY - +new Date(e.day)) / 864e5;
    return 1;
  };
  const filtered_list = shows.filter(show_filter);
  let shows_promise = getShows(filtered_list);
  $$result.css.add(css$d);
  return `${function(__value) {
    if (is_promise(__value))
      return `
    <div class="${"p20"}">Fetching...</div>
`;
    return function(response) {
      return `
    ${each(response, (show2) => `<div class="${"card svelte-xoaitx"}"><img${add_attribute("src", show2.image, 0)}${add_attribute("alt", show2.name, 0)} class="${"svelte-xoaitx"}">
            <div class="${"card-body \u0192 svelte-xoaitx"}"><div class="${"card-text svelte-xoaitx"}"><h3 class="${"svelte-xoaitx"}">${escape(show2.name)}</h3>
                    <h5 class="${"svelte-xoaitx"}">${escape(show2.ep)}</h5>
                    <!-- HTML_TAG_START -->${show2.abt}<!-- HTML_TAG_END --></div>
                <div class="${"button svelte-xoaitx"}">Released: ${escape(cleanDate(show2.airstamp))} <br>
                    Last Seen: ${escape(cleanDate(show2.last_seen))}</div>
            </div></div>
        <hr class="${"w-50"}">`)}
`;
    }(__value);
  }(shows_promise)}`;
});
var show = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Show
});
const Test = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Monitor", results = [] } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  return `<article><h3>${escape(title)}</h3>
    <p>${each(results, (res) => `<div class="${"\u0192 \u0192\u2211"}"><span class="${"fw5"}">${escape(res.name)}:\xA0</span>
                ${res.check ? `Passed` : `Failed
                    <div class="${"w-100"}" style="${"padding-left:20px;"}"><span class="${"fw6"}">expected: </span>${escape(res.expect)}
                        <br>
                        <span class="${"fw6"}">outcome: </span>${escape(res.value)}
                    </div>`}
            </div>`)}</p></article>`;
});
var test = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Test
});
const Chkdsk = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let test_list = [];
  return `${each(test_list, (test2) => `<div>${function(__value) {
    if (is_promise(__value))
      return `
            <h1>Testing ${escape(test2.name)}...</h1>
        `;
    return function(results) {
      return `
            ${validate_component(Test, "Card").$$render($$result, { title: test2.name, results }, {}, {})}
        `;
    }(__value);
  }(test2["component"]())}
    </div>`)}

<section><img id="${"engineImage"}" width="${"10px"}" height="${"10px"}" src="${""}" alt="${""}"></section>`;
});
var chkdsk = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Chkdsk
});
var summary_svelte_svelte_type_style_lang = ".up.svelte-1d34z7a{color:#f00}.down.svelte-1d34z7a{color:#0f0}";
const css$c = {
  code: ".up.svelte-1d34z7a{color:#f00}.down.svelte-1d34z7a{color:#0f0}",
  map: `{"version":3,"file":"summary.svelte","sources":["summary.svelte"],"sourcesContent":["<script>\\n    import { getCo2 } from \\"./components/functions\\";\\n\\n    const changeCheck = (curr, prev) => {\\n        if (curr >= prev) return 1;\\n        return 0;\\n    };\\n<\/script>\\n\\n<div>\\n    <h2>CO<sub>2</sub> conc</h2>\\n    {#await getCo2()}\\n        Wait\\n    {:then resp}\\n        <span\\n            class=\\"{changeCheck(resp.current.value, resp.previous.value)\\n                ? 'up'\\n                : 'down'} fw6\\"\\n            style=\\"font-size: 3em;\\"\\n        >\\n            {resp.current.value} ppm\\n        </span>\\n        <span>\\n            \u2206 {(resp.current.value - resp.previous.value).toFixed(2)}\\n        </span>\\n    {/await}\\n</div>\\n\\n<style>\\n    .up {\\n        color: #f00;\\n    }\\n    .down {\\n        color: #0f0;\\n    }\\n</style>\\n"],"names":[],"mappings":"AA6BI,GAAG,eAAC,CAAC,AACD,KAAK,CAAE,IAAI,AACf,CAAC,AACD,KAAK,eAAC,CAAC,AACH,KAAK,CAAE,IAAI,AACf,CAAC"}`
};
const Summary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const changeCheck = (curr, prev) => {
    if (curr >= prev)
      return 1;
    return 0;
  };
  $$result.css.add(css$c);
  return `<div><h2>CO<sub>2</sub> conc</h2>
    ${function(__value) {
    if (is_promise(__value))
      return `
        Wait
    `;
    return function(resp) {
      return `
        <span class="${escape(changeCheck(resp.current.value, resp.previous.value) ? "up" : "down") + " fw6 svelte-1d34z7a"}" style="${"font-size: 3em;"}">${escape(resp.current.value)} ppm
        </span>
        <span>\u2206 ${escape((resp.current.value - resp.previous.value).toFixed(2))}</span>
    `;
    }(__value);
  }(getCo2())}
</div>`;
});
var summary = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Summary
});
const Monitor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `


<main class="${"p5 \u0192 \u0192\u2211"}">${validate_component(Tile$1, "Tile").$$render($$result, {
    class: "m20",
    style: "width: calc(50% - 40px);"
  }, {}, {
    default: () => `${validate_component(Summary, "EnvSummary").$$render($$result, {}, {}, {})}`
  })}
    ${validate_component(Tile$1, "Tile").$$render($$result, {
    class: "m20",
    style: "width: calc(50% - 40px);"
  }, {}, {
    default: () => `
        ok
    `
  })}
    ${validate_component(ExpandableTile, "ExpandableTile").$$render($$result, {
    class: "m20",
    style: "width: calc(50% - 40px);"
  }, {}, {
    below: () => `<div slot="${"below"}">${validate_component(Chkdsk, "Checks").$$render($$result, {}, {}, {})}</div>`,
    above: () => `<div slot="${"above"}"><code>${escape(metadata.name)}</code> build:
            <code>${escape(metadata.build.version)}::${escape(metadata.build.current)}</code>
            <br>Compiled: ${escape(new Date(metadata.time).toLocaleString("en-GB"))}</div>`
  })}
</main>`;
});
var index$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Monitor
});
var sumbox_svelte_svelte_type_style_lang = "#stats.svelte-181llfb{position:absolute;bottom:3em;right:10px;opacity:0;justify-content:space-between;width:20vw;background:transparent;animation:goOut 0.5s 5s forwards ease;transition:opacity 0.2s ease}";
const css$b = {
  code: "#stats.svelte-181llfb{position:absolute;bottom:3em;right:10px;opacity:0;justify-content:space-between;width:20vw;background:transparent;animation:goOut 0.5s 5s forwards ease;transition:opacity 0.2s ease}",
  map: '{"version":3,"file":"sumbox.svelte","sources":["sumbox.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n  import { Riquest, serverURL } from \\"$lib/shared/molecular.js\\";\\n\\n  let system,\\n    network = \\"...\\";\\n\\n  const request = new Riquest(serverURL, \\"json\\");\\n\\n  const smc = () => request.get(\\"/sys/smc\\").then((r) => (system = r));\\n  const net = () =>\\n    request.get(\\"/sys/net\\").then((r) => (network = r.speed + \\" MB/s\\"));\\n\\n  onMount(net);\\n\\n  const getData = (e) => {\\n    e.target.style.opacity = 1;\\n    e.target.parentElement.style.opacity = 1;\\n    if (!(system && network)) smc();\\n  };\\n<\/script>\\n\\n<div id=\\"stats\\" class=\\"\u{1F943} m5 p20\\" on:mouseover={getData}>\\n  Fan Speed: <progress max=\\"6520\\" value={+system?.fan || 0} />\\n  <br /> CPU Temp: <progress max=\\"100\\" value={+system?.cpu || 0} />\\n  <br /> MBo Temp: <progress max=\\"100\\" value={+system?.board || 0} />\\n  <br /> Networks: <i> {network}</i>\\n</div>\\n\\n<style>\\n  #stats {\\n    position: absolute;\\n    bottom: 3em;\\n    right: 10px;\\n    opacity: 0;\\n    justify-content: space-between;\\n    width: 20vw;\\n    background: transparent;\\n    animation: goOut 0.5s 5s forwards ease;\\n    transition: opacity 0.2s ease;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8BE,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CACV,eAAe,CAAE,aAAa,CAC9B,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,WAAW,CACvB,SAAS,CAAE,KAAK,CAAC,IAAI,CAAC,EAAE,CAAC,QAAQ,CAAC,IAAI,CACtC,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAAI,AAC/B,CAAC"}'
};
const Sumbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let system, network = "...";
  new Riquest(serverURL, "json");
  $$result.css.add(css$b);
  return `<div id="${"stats"}" class="${"\u{1F943} m5 p20 svelte-181llfb"}">Fan Speed: <progress max="${"6520"}"${add_attribute("value", +(system == null ? void 0 : system.fan) || 0, 0)}></progress>
  <br> CPU Temp: <progress max="${"100"}"${add_attribute("value", +(system == null ? void 0 : system.cpu) || 0, 0)}></progress>
  <br> MBo Temp: <progress max="${"100"}"${add_attribute("value", +(system == null ? void 0 : system.board) || 0, 0)}></progress>
  <br> Networks: <i>${escape(network)}</i>
</div>`;
});
var sumbox = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Sumbox
});
var button_svelte_svelte_type_style_lang = ".btn.svelte-1oiqxcj{--theme:#18f;cursor:pointer;margin:10px;padding:10px;transform:scale(1);transition:all 0.2s ease;color:#fff;background:var(--theme)}.btn.svelte-1oiqxcj:disabled{cursor:default;color:#fff;background:#888}.btn.svelte-1oiqxcj:hover:not(:disabled){transform:scale(1.05);background:var(--theme);color:#ddd;z-index:999}.btn[flat].svelte-1oiqxcj{color:var(--theme);background:#fff}.btn[flat].svelte-1oiqxcj:hover:not(:disabled){color:var(--theme);background:#ddd}.btn[square].svelte-1oiqxcj{height:50px;width:50px}";
var svgIcon_svelte_svelte_type_style_lang = "svg.svelte-xufjgf{stroke-linecap:round;stroke-linejoin:round}";
const css$a = {
  code: "svg.svelte-xufjgf{stroke-linecap:round;stroke-linejoin:round}",
  map: '{"version":3,"file":"svgIcon.svelte","sources":["svgIcon.svelte"],"sourcesContent":["<script>\\n    export let size = 24,\\n        stroke = \\"currentcolor\\",\\n        classes = \\"\\",\\n        style = \\"\\",\\n        fill = \\"none\\";\\n<\/script>\\n\\n<svg\\n    class={classes}\\n    viewBox=\\"0 0 32 32\\"\\n    width={size}\\n    height={size}\\n    {stroke}\\n    stroke-width=\\"2\\"\\n    {fill}\\n    {style}\\n>\\n    <slot />\\n</svg>\\n\\n<style>\\n    svg {\\n        stroke-linecap: round;\\n        stroke-linejoin: round;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAsBI,GAAG,cAAC,CAAC,AACD,cAAc,CAAE,KAAK,CACrB,eAAe,CAAE,KAAK,AAC1B,CAAC"}'
};
const SvgIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24, stroke = "currentcolor", classes = "", style = "", fill = "none" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0)
    $$bindings.stroke(stroke);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  $$result.css.add(css$a);
  return `<svg class="${escape(null_to_empty(classes)) + " svelte-xufjgf"}" viewBox="${"0 0 32 32"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)}${add_attribute("stroke", stroke, 0)} stroke-width="${"2"}"${add_attribute("fill", fill, 0)}${add_attribute("style", style, 0)}>${slots.default ? slots.default({}) : ``}</svg>`;
});
var bar_svelte_svelte_type_style_lang = "form.svelte-1sbiljw{justify-content:space-between;z-index:9;font-size:1.1em;padding:0 30%;position:fixed;top:0;justify-content:space-between;transition:all 0.3s ease;align-items:center}form.svelte-1sbiljw:hover,form.svelte-1sbiljw:focus{opacity:1}";
const css$9 = {
  code: "form.svelte-1sbiljw{justify-content:space-between;z-index:9;font-size:1.1em;padding:0 30%;position:fixed;top:0;justify-content:space-between;transition:all 0.3s ease;align-items:center}form.svelte-1sbiljw:hover,form.svelte-1sbiljw:focus{opacity:1}",
  map: '{"version":3,"file":"bar.svelte","sources":["bar.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n  import { SvgIcon } from \\"$lib/components\\";\\n  import { TextInput } from \\"$hakama\\";\\n  import { channels, nebula } from \\"../shared/store\\";\\n\\n  export let searcher;\\n\\n  let searchText = \\"\\";\\n\\n  onMount(() => {\\n    if (get\xB5().q || get\xB5().id) {\\n      searchText = get\xB5()?.q || \\"\\";\\n    } else {\\n      nebula();\\n      channels();\\n    }\\n  });\\n<\/script>\\n\\n<form class=\\"o-0 w-100 p5 \u0192 \u{1F943}\\" on:submit|preventDefault={searcher}>\\n  <TextInput\\n    class=\\"p5\\"\\n    hideLabel\\n    size=\\"40\\"\\n    placeholder=\\"Search\\"\\n    value={searchText}\\n    style=\\"border:none;background:transparent;outline:none;\\"\\n  />\\n  <SvgIcon size=\\"22\\">\\n    <circle stroke=\\"#fff\\" cx=\\"14\\" cy=\\"14\\" r=\\"12\\" />\\n    <path stroke=\\"#fff\\" d=\\"M23 23 L30 30\\" />\\n  </SvgIcon>\\n</form>\\n\\n<style type=\\"text/scss\\">form {\\n  justify-content: space-between;\\n  z-index: 9;\\n  font-size: 1.1em;\\n  padding: 0 30%;\\n  position: fixed;\\n  top: 0;\\n  justify-content: space-between;\\n  transition: all 0.3s ease;\\n  align-items: center;\\n}\\nform:hover, form:focus {\\n  opacity: 1;\\n}</style>\\n"],"names":[],"mappings":"AAmCwB,IAAI,eAAC,CAAC,AAC5B,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,eAAe,CAAE,aAAa,CAC9B,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,mBAAI,MAAM,CAAE,mBAAI,MAAM,AAAC,CAAC,AACtB,OAAO,CAAE,CAAC,AACZ,CAAC"}'
};
const Bar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { searcher } = $$props;
  let searchText = "";
  if ($$props.searcher === void 0 && $$bindings.searcher && searcher !== void 0)
    $$bindings.searcher(searcher);
  $$result.css.add(css$9);
  return `<form class="${"o-0 w-100 p5 \u0192 \u{1F943} svelte-1sbiljw"}">${validate_component(TextInput, "TextInput").$$render($$result, {
    class: "p5",
    hideLabel: true,
    size: "40",
    placeholder: "Search",
    value: searchText,
    style: "border:none;background:transparent;outline:none;"
  }, {}, {})}
  ${validate_component(SvgIcon, "SvgIcon").$$render($$result, { size: "22" }, {}, {
    default: () => `<circle stroke="${"#fff"}" cx="${"14"}" cy="${"14"}" r="${"12"}"></circle>
    <path stroke="${"#fff"}" d="${"M23 23 L30 30"}"></path>`
  })}
</form>`;
});
var bar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Bar
});
const Player = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $vId, $$unsubscribe_vId;
  $$unsubscribe_vId = subscribe(vId, (value) => $vId = value);
  let maxwell;
  $$unsubscribe_vId();
  return `${validate_component(AspectRatio, "AspectRatio").$$render($$result, { class: "w-100 h-100 \u2020c", ratio: "16x10" }, {}, {
    default: () => `${$vId ? `<iframe title="${"vid"}" class="${"w-100 h-100"}" frameborder="${"0"}"${add_attribute("src", $vId, 0)} allow="${"accelerometer;autoplay;clipboard-write;encrypted-media;picture-in-picture"}" sandbox="${"allow-scripts allow-same-origin"}"${add_attribute("this", maxwell, 0)}></iframe>` : ``}`
  })}`;
});
var player = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Player
});
var videoCard_svelte_svelte_type_style_lang = ".recom.svelte-11i8u5m.svelte-11i8u5m{cursor:pointer;width:calc(20% - 10px);z-index:1;transition:all 0.2s ease;position:relative}.recom.svelte-11i8u5m .deets.svelte-11i8u5m{background:#222;pointer-events:none;position:absolute;z-index:0;opacity:0;top:50%;transition:all 0.15s ease}.recom.svelte-11i8u5m.svelte-11i8u5m:hover{transform:scale(1.1);z-index:2}.recom.svelte-11i8u5m:hover .deets.svelte-11i8u5m{z-index:44;opacity:1;top:100%}";
const css$8 = {
  code: ".recom.svelte-11i8u5m.svelte-11i8u5m{cursor:pointer;width:calc(20% - 10px);z-index:1;transition:all 0.2s ease;position:relative}.recom.svelte-11i8u5m .deets.svelte-11i8u5m{background:#222;pointer-events:none;position:absolute;z-index:0;opacity:0;top:50%;transition:all 0.15s ease}.recom.svelte-11i8u5m.svelte-11i8u5m:hover{transform:scale(1.1);z-index:2}.recom.svelte-11i8u5m:hover .deets.svelte-11i8u5m{z-index:44;opacity:1;top:100%}",
  map: '{"version":3,"file":"videoCard.svelte","sources":["videoCard.svelte"],"sourcesContent":["<script>\\n    import { videoSet } from \\"../shared/store\\";\\n    import { ImageLoader } from \\"$hakama\\";\\n\\n    export let //\\n        title = \\"\\",\\n        details = [],\\n        token,\\n        type,\\n        slug,\\n        image;\\n<\/script>\\n\\n<div class=\\"recom m5 p0 \u0192-col\\" on:click={videoSet}>\\n    <a\\n        href=\\"#wrapper\\"\\n        data-type={type}\\n        data-title={title}\\n        data-token={token}\\n        data-slug={slug}\\n    >\\n        <ImageLoader class=\\"w-100\\" ratio=\\"16x9\\" src={image} />\\n        <div class=\\"\u2020c w-100 deets p5\\">\\n            <div style=\\"padding-bottom:5px;\\">\\n                {@html title.slice(0, 60)}\\n                {title.length > 60 ? \\"...\\" : \\"\\"}\\n            </div>\\n            <div style=\\"color: #888;\\">\\n                {details.join(\\" \u2022 \\")}\\n            </div>\\n        </div>\\n    </a>\\n</div>\\n\\n<style type=\\"text/scss\\">.recom {\\n  cursor: pointer;\\n  width: calc(20% - 10px);\\n  z-index: 1;\\n  transition: all 0.2s ease;\\n  position: relative;\\n}\\n.recom .deets {\\n  background: #222;\\n  pointer-events: none;\\n  position: absolute;\\n  z-index: 0;\\n  opacity: 0;\\n  top: 50%;\\n  transition: all 0.15s ease;\\n}\\n.recom:hover {\\n  transform: scale(1.1);\\n  z-index: 2;\\n}\\n.recom:hover .deets {\\n  z-index: 44;\\n  opacity: 1;\\n  top: 100%;\\n}</style>\\n"],"names":[],"mappings":"AAkCwB,MAAM,8BAAC,CAAC,AAC9B,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,CAAC,CACvB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,QAAQ,CAAE,QAAQ,AACpB,CAAC,AACD,qBAAM,CAAC,MAAM,eAAC,CAAC,AACb,UAAU,CAAE,IAAI,CAChB,cAAc,CAAE,IAAI,CACpB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,CAAC,CACV,GAAG,CAAE,GAAG,CACR,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC5B,CAAC,AACD,oCAAM,MAAM,AAAC,CAAC,AACZ,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,qBAAM,MAAM,CAAC,MAAM,eAAC,CAAC,AACnB,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,CAAC,CACV,GAAG,CAAE,IAAI,AACX,CAAC"}'
};
const VideoCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "", details = [], token, type, slug, image } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0)
    $$bindings.details(details);
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  $$result.css.add(css$8);
  return `<div class="${"recom m5 p0 \u0192-col svelte-11i8u5m"}"><a href="${"#wrapper"}"${add_attribute("data-type", type, 0)}${add_attribute("data-title", title, 0)}${add_attribute("data-token", token, 0)}${add_attribute("data-slug", slug, 0)}>${validate_component(ImageLoader, "ImageLoader").$$render($$result, {
    class: "w-100",
    ratio: "16x9",
    src: image
  }, {}, {})}
        <div class="${"\u2020c w-100 deets p5 svelte-11i8u5m"}"><div style="${"padding-bottom:5px;"}"><!-- HTML_TAG_START -->${title.slice(0, 60)}<!-- HTML_TAG_END -->
                ${escape(title.length > 60 ? "..." : "")}</div>
            <div style="${"color: #888;"}">${escape(details.join(" \u2022 "))}</div></div></a>
</div>`;
});
var videoCard = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": VideoCard
});
const YT_subs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let videos;
  let $substack, $$unsubscribe_substack;
  $$unsubscribe_substack = subscribe(substack, (value) => $substack = value);
  let slicer = 2;
  videos = $substack;
  $$unsubscribe_substack();
  return `<section class="${"\u0192 p20 \u0192\u2211"}" id="${"search"}">${videos.length ? `<div class="${"w-100 \u0192 p5 \u2206-bw"}"><span>Youtube </span>
      <span>${validate_component(Slider, "Slider").$$render($$result, { hideTextInput: true, max: 6, value: 2 }, {}, {})}</span></div>
    ${each(videos.sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)).slice(0, slicer * 5), (vid, i) => `${validate_component(VideoCard, "Card").$$render($$result, {
    title: vid.snippet.title,
    type: "Youtube",
    slug: vid.snippet.resourceId.videoId,
    image: vid.snippet.thumbnails.medium.url,
    details: [vid.snippet.channelTitle, new Kron(vid.snippet.publishedAt).timeSince()]
  }, {}, {})}`)}` : ``}</section>`;
});
var YT_subs$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": YT_subs
});
const NB_subs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let videos;
  let $subscriptions, $$unsubscribe_subscriptions;
  $$unsubscribe_subscriptions = subscribe(subscriptions, (value) => $subscriptions = value);
  let slicer = 1;
  videos = $subscriptions;
  $$unsubscribe_subscriptions();
  return `<section class="${"\u0192 p20 \u0192\u2211"}" id="${"search"}">${videos.length ? `<div class="${"w-100 \u0192 p5 \u2206-bw"}"><span>Nebula </span>
            <span>${validate_component(Slider, "Slider").$$render($$result, { hideTextInput: true, max: 4, value: 1 }, {}, {})}</span></div>
        ${each(videos.slice(0, slicer * 5), (vid) => `${validate_component(VideoCard, "Card").$$render($$result, {
    title: vid.title,
    slug: vid.uri,
    type: "Nebula",
    image: vid.image,
    token: vid.token,
    details: [vid.channel, new Kron(vid.date).timeSince()]
  }, {}, {})}`)}` : ``}</section>`;
});
var NB_subs$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": NB_subs
});
var search_svelte_svelte_type_style_lang = ".p5.svelte-j0cveg{width:99vw}";
const css$7 = {
  code: ".p5.svelte-j0cveg{width:99vw}",
  map: '{"version":3,"file":"search.svelte","sources":["search.svelte"],"sourcesContent":["<script>\\n  export let videos = [];\\n\\n  import Card from \\"../shared/videoCard.svelte\\";\\n  import { Kron } from \\"$lib/shared/molecular\\";\\n<\/script>\\n\\n<section class=\\"p20 \u0192 \u0192\u2211\\" id=\\"search\\">\\n  {#if videos.length}\\n    <div class=\\"p5\\">\\n      <div on:click={() => (videos = [])}>Search</div>\\n    </div>\\n    {#each videos as vid}\\n      <Card\\n        title={vid.snippet.title}\\n        type=\\"Youtube\\"\\n        image={vid.snippet.thumbnails.medium.url}\\n        slug={vid.id.videoId}\\n        details={[\\n          vid.snippet.channelTitle,\\n          new Kron(vid.snippet.publishedAt).timeSince(),\\n        ]}\\n      />\\n    {/each}\\n  {/if}\\n</section>\\n\\n<style>\\n  .p5 {\\n    width: 99vw;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4BE,GAAG,cAAC,CAAC,AACH,KAAK,CAAE,IAAI,AACb,CAAC"}'
};
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { videos = [] } = $$props;
  if ($$props.videos === void 0 && $$bindings.videos && videos !== void 0)
    $$bindings.videos(videos);
  $$result.css.add(css$7);
  return `<section class="${"p20 \u0192 \u0192\u2211"}" id="${"search"}">${videos.length ? `<div class="${"p5 svelte-j0cveg"}"><div>Search</div></div>
    ${each(videos, (vid) => `${validate_component(VideoCard, "Card").$$render($$result, {
    title: vid.snippet.title,
    type: "Youtube",
    image: vid.snippet.thumbnails.medium.url,
    slug: vid.id.videoId,
    details: [vid.snippet.channelTitle, new Kron(vid.snippet.publishedAt).timeSince()]
  }, {}, {})}`)}` : ``}
</section>`;
});
var search = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Search
});
var index_svelte_svelte_type_style_lang$2 = ".cont.svelte-1breaw4{height:100vh;width:100vw;justify-content:center;align-items:center}main.svelte-1breaw4{overflow-x:hidden}";
const css$6 = {
  code: ".cont.svelte-1breaw4{height:100vh;width:100vw;justify-content:center;align-items:center}main.svelte-1breaw4{overflow-x:hidden}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n    import Bar from \\"./components/bar.svelte\\";\\n    import Player from \\"./components/player.svelte\\";\\n    import Subsc from \\"./components/YT_subs.svelte\\";\\n    import NebSubsc from \\"./components/NB_subs.svelte\\";\\n    import Search from \\"./components/search.svelte\\";\\n\\n    import { onMount } from \\"svelte\\";\\n    import { videoProcessor, search } from \\"./shared/store\\";\\n\\n    let base = [];\\n\\n    const searcher = (sc) => {\\n        const q = typeof sc === \\"string\\" ? sc : sc.target[0].value;\\n        if (!q) return set\xB5(\\"q\\", \\"\\");\\n        else search(q).then((r) => (base = r.items));\\n        window.location.href = \\"#search\\";\\n        return set\xB5(\\"q\\", q);\\n    };\\n\\n    onMount(() => {\\n        const params = get\xB5();\\n        params.q && searcher(params.q);\\n        if (params.id) {\\n            videoProcessor(params.type, params.id, params.token);\\n        }\\n        return 0;\\n    });\\n<\/script>\\n\\n<svelte:head>\\n    <style>\\n        body {\\n            background: #111;\\n            color: #fff;\\n        }\\n    </style>\\n</svelte:head>\\n\\n<main>\\n    <Bar {searcher} />\\n    <div class=\\"\u0192 cont\\">\\n        <Player />\\n    </div>\\n    <Search videos={base} />\\n    <Subsc />\\n    <NebSubsc />\\n</main>\\n\\n<style>\\n    .cont {\\n        height: 100vh;\\n        width: 100vw;\\n        justify-content: center;\\n        align-items: center;\\n    }\\n    main {\\n        overflow-x: hidden;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAkDI,KAAK,eAAC,CAAC,AACH,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACvB,CAAC,AACD,IAAI,eAAC,CAAC,AACF,UAAU,CAAE,MAAM,AACtB,CAAC"}'
};
const Stream = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let base2 = [];
  const searcher = (sc) => {
    const q = typeof sc === "string" ? sc : sc.target[0].value;
    if (!q)
      return set\u00B5("q", "");
    else
      search$1(q).then((r) => base2 = r.items);
    window.location.href = "#search";
    return set\u00B5("q", q);
  };
  $$result.css.add(css$6);
  return `${$$result.head += `<style data-svelte="svelte-12h9lhz">body {
            background: #111;
            color: #fff;
        }
    </style>`, ""}

<main class="${"svelte-1breaw4"}">${validate_component(Bar, "Bar").$$render($$result, { searcher }, {}, {})}
    <div class="${"\u0192 cont svelte-1breaw4"}">${validate_component(Player, "Player").$$render($$result, {}, {}, {})}</div>
    ${validate_component(Search, "Search").$$render($$result, { videos: base2 }, {}, {})}
    ${validate_component(YT_subs, "Subsc").$$render($$result, {}, {}, {})}
    ${validate_component(NB_subs, "NebSubsc").$$render($$result, {}, {}, {})}
</main>`;
});
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Stream
});
var index_svelte_svelte_type_style_lang$1 = ".codeContainer.svelte-ryu7ba{position:relative}section.svelte-ryu7ba{height:100vh;background:#000;color:#fff}iframe.svelte-ryu7ba{background:#fff}";
const css$5 = {
  code: ".codeContainer.svelte-ryu7ba{position:relative}section.svelte-ryu7ba{height:100vh;background:#000;color:#fff}iframe.svelte-ryu7ba{background:#fff}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n  import { w3, wordCount, initialize } from \\"./functions\\";\\n  import { base } from \\"$app/paths\\";\\n  import { debounce } from \\"$lib/shared/molecular\\";\\n\\n  let //\\n    ifr,\\n    words,\\n    oldHT = \\"\\";\\n\\n  const render = () => {\\n    const html = editor.getValue();\\n    recalculate(html);\\n  };\\n\\n  const recalculate = (html) => {\\n    const htmlURI = html;\\n    if (oldHT === htmlURI) return 0;\\n    oldHT = htmlURI;\\n\\n    ifr.document.open();\\n    ifr.document.write(htmlURI);\\n    ifr.document.close();\\n\\n    words = wordCount(editor.getValue());\\n  };\\n\\n  onMount(() => {\\n    let x = setInterval(() => {\\n      if (CodeMirror) {\\n        initialize();\\n        render();\\n        clearInterval(x);\\n      }\\n    }, 10);\\n    ifr = \u0192(\\"iframe\\");\\n    ifr = ifr.contentWindow || ifr.contentDocument?.document;\\n  });\\n<\/script>\\n\\n<svelte:head>\\n  <title>Jupiter</title>\\n  {#each [\\"codemirror\\", \\"css\\", \\"xml+mixedHtml\\", \\"js\\"] as js}\\n    <script src=\\"{base}/helpers/codes/{js}.js\\"><\/script>\\n  {/each}\\n  <link rel=\\"stylesheet\\" href=\\"{base}/helpers/codes/codemirror+cobalt.css\\" />\\n</svelte:head>\\n\\n<section class=\\"\u0192\\">\\n  <div class=\\"w-50 h-100 codeContainer\\" on:keyup={debounce(render, 1000)}>\\n    <textarea spellcheck=\\"true\\" id=\\"code\\" value={w3} />\\n  </div>\\n  <div class=\\"h-100 \u0192\u2211 p5 m0 w-50\\">\\n    <iframe\\n      title=\\"sim\\"\\n      src=\\"/assets/repl.html\\"\\n      class=\\"w-100 h-100\\"\\n      frameborder=\\"0\\"\\n    />\\n  </div>\\n</section>\\n<section class=\\"w-100 h-100\\">\\n  <div class=\\"p20\\">\\n    {words}\\n  </div>\\n</section>\\n\\n<style type=\\"text/scss\\">.codeContainer {\\n  position: relative;\\n}\\n\\nsection {\\n  height: 100vh;\\n  background: #000;\\n  color: #fff;\\n}\\n\\niframe {\\n  background: #fff;\\n}</style>\\n"],"names":[],"mappings":"AAoEwB,cAAc,cAAC,CAAC,AACtC,QAAQ,CAAE,QAAQ,AACpB,CAAC,AAED,OAAO,cAAC,CAAC,AACP,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,MAAM,cAAC,CAAC,AACN,UAAU,CAAE,IAAI,AAClB,CAAC"}'
};
const Debug = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let words;
  $$result.css.add(css$5);
  return `${$$result.head += `${$$result.title = `<title>Jupiter</title>`, ""}${each(["codemirror", "css", "xml+mixedHtml", "js"], (js) => `<script src="${escape(base) + "/helpers/codes/" + escape(js) + ".js"}" data-svelte="svelte-1471t2x"><\/script>`)}<link rel="${"stylesheet"}" href="${escape(base) + "/helpers/codes/codemirror+cobalt.css"}" data-svelte="svelte-1471t2x">`, ""}

<section class="${"\u0192 svelte-ryu7ba"}"><div class="${"w-50 h-100 codeContainer svelte-ryu7ba"}"><textarea spellcheck="${"true"}" id="${"code"}">${escape(w3)}</textarea></div>
  <div class="${"h-100 \u0192\u2211 p5 m0 w-50"}"><iframe title="${"sim"}" src="${"/assets/repl.html"}" class="${"w-100 h-100 svelte-ryu7ba"}" frameborder="${"0"}"></iframe></div></section>
<section class="${"w-100 h-100 svelte-ryu7ba"}"><div class="${"p20"}">${escape(words)}</div>
</section>`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Debug
});
var editor_svelte_svelte_type_style_lang = "#editorOfNotes.svelte-lg0tho{height:calc(100vh - 1px);overflow:scroll}";
const css$4 = {
  code: "#editorOfNotes.svelte-lg0tho{height:calc(100vh - 1px);overflow:scroll}",
  map: '{"version":3,"file":"editor.svelte","sources":["editor.svelte"],"sourcesContent":["<script>\\n    import { onMount } from \\"svelte\\";\\n    let dataSetId;\\n\\n    const randomString = (len) => {\\n        const dec2hex = (dec) => dec.toString(16).padStart(2, \\"0\\");\\n        let arr = new Uint8Array((len || 40) / 2);\\n        window.crypto.getRandomValues(arr);\\n        return Array.from(arr, dec2hex).join(\\"\\");\\n    };\\n    onMount(() => (dataSetId = randomString(6)));\\n<\/script>\\n\\n<section data-new=\\"true\\" data-id={dataSetId} id=\\"editorOfNotes\\" />\\n\\n<style>\\n    #editorOfNotes {\\n        height: calc(100vh - 1px);\\n        overflow: scroll;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAgBI,cAAc,cAAC,CAAC,AACZ,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CACzB,QAAQ,CAAE,MAAM,AACpB,CAAC"}'
};
const Editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dataSetId;
  $$result.css.add(css$4);
  return `<section data-new="${"true"}"${add_attribute("data-id", dataSetId, 0)} id="${"editorOfNotes"}" class="${"svelte-lg0tho"}"></section>`;
});
var editor$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Editor
});
var index_svelte_svelte_type_style_lang = ".fns.svelte-lrdbep{justify-content:center}main.svelte-lrdbep{height:100vh;overflow:hidden}";
const css$3 = {
  code: ".fns.svelte-lrdbep{justify-content:center}main.svelte-lrdbep{height:100vh;overflow:hidden}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n    import Editor from \\"./components/editor.svelte\\";\\n    import { onMount } from \\"svelte\\";\\n    import { base } from \\"$app/paths\\";\\n\\n    import { Button, Dropdown } from \\"$hakama\\";\\n    import { serverURL } from \\"$lib/shared/molecular\\";\\n\\n    import { updateNote, getNotes, getNote } from \\"./components/api\\";\\n    import { editorData, notesList } from \\"./components/store\\";\\n\\n    let //\\n        tools,\\n        currentData,\\n        saveButton = \\"ghost\\",\\n        selectedIndex;\\n\\n    const onSelect = (e) => {\\n        getNote(e.detail.selectedId);\\n    };\\n\\n    const noteFilter = (e) => {\\n        return {\\n            text: e.title,\\n            id: e.id,\\n        };\\n    };\\n\\n    const saver = async () => {\\n        const outputData = await editor.save();\\n\\n        if (outputData === currentData) return;\\n        saveButton = \\"danger\\";\\n        currentData = outputData;\\n        updateNote(mainEditor.dataset.id, outputData)\\n            .then((r) => (saveButton = \\"ghost\\"))\\n            .catch(console.log);\\n        return 0;\\n    };\\n\\n    const deleter = () => {\\n        const len = $notesList.length;\\n        selectedIndex = (selectedIndex + 1) % len;\\n        updateNote(mainEditor.dataset.id);\\n    };\\n\\n    onMount(() => {\\n        getNotes().then((r) => (selectedIndex = 0));\\n\\n        window.mainEditor = \u0192(\\"#editorOfNotes\\");\\n        tools = {\\n            header: Header,\\n            alert: Alert,\\n            image: SimpleImage,\\n            list: List,\\n            link: {\\n                class: LinkTool,\\n                config: {\\n                    endpoint: serverURL + \\"requestMetadata\\",\\n                },\\n            },\\n            embed: Embed,\\n            table: Table,\\n            checklist: Checklist,\\n        };\\n        window.editor = new EditorJS({\\n            holder: \\"editorOfNotes\\",\\n            tools,\\n            data: $editorData,\\n        });\\n    });\\n\\n    const handleKeyDown = (e) => {\\n        if (e.metaKey && e.keyCode === 83) {\\n            e.preventDefault();\\n            saver();\\n        }\\n    };\\n<\/script>\\n\\n<svelte:head>\\n    <title>Terrelysium</title>\\n    <style>\\n        body {\\n            color: #fff;\\n            min-height: 100vh;\\n        }\\n    </style>\\n    {#each [\\"editorjs\\", \\"header+embed\\", \\"table+alert\\", \\"checklist+list\\", \\"simple-image+link\\"] as js}\\n        <script src=\\"{base}/helpers/notes/{js}.js\\"><\/script>\\n    {/each}\\n</svelte:head>\\n\\n<svelte:window on:keydown={handleKeyDown} />\\n\\n<main class=\\"w-100\\" style=\\"z-index: 0;\\">\\n    <div class=\\"w-100 fns \u0192\\">\\n        <Button kind={saveButton} on:click={saver}>Saver</Button>\\n        <Button kind=\\"danger-ghost\\" on:click={deleter}>Delete</Button>\\n        <Dropdown\\n            on:select\\n            hideLabel\\n            type=\\"inline\\"\\n            on:select={onSelect}\\n            bind:selectedIndex\\n            items={$notesList.map(noteFilter)}\\n            style=\\"grid-gap:unset;\\"\\n        />\\n    </div>\\n    <Editor />\\n</main>\\n\\n<style type=\\"text/scss\\">.fns {\\n  justify-content: center;\\n}\\n\\nmain {\\n  height: 100vh;\\n  overflow: hidden;\\n}</style>\\n"],"names":[],"mappings":"AAgHwB,IAAI,cAAC,CAAC,AAC5B,eAAe,CAAE,MAAM,AACzB,CAAC,AAED,IAAI,cAAC,CAAC,AACJ,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
const Notes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_editorData;
  let $notesList, $$unsubscribe_notesList;
  $$unsubscribe_editorData = subscribe(editorData, (value) => value);
  $$unsubscribe_notesList = subscribe(notesList, (value) => $notesList = value);
  let saveButton = "ghost", selectedIndex;
  const noteFilter = (e) => {
    return { text: e.title, id: e.id };
  };
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>Terrelysium</title>`, ""}<style data-svelte="svelte-tw3j0t">body {
            color: #fff;
            min-height: 100vh;
        }
    </style>${each([
      "editorjs",
      "header+embed",
      "table+alert",
      "checklist+list",
      "simple-image+link"
    ], (js) => `<script src="${escape(base) + "/helpers/notes/" + escape(js) + ".js"}" data-svelte="svelte-tw3j0t"><\/script>`)}`, ""}



<main class="${"w-100 svelte-lrdbep"}" style="${"z-index: 0;"}"><div class="${"w-100 fns \u0192 svelte-lrdbep"}">${validate_component(Button, "Button").$$render($$result, { kind: saveButton }, {}, { default: () => `Saver` })}
        ${validate_component(Button, "Button").$$render($$result, { kind: "danger-ghost" }, {}, { default: () => `Delete` })}
        ${validate_component(Dropdown, "Dropdown").$$render($$result, {
      hideLabel: true,
      type: "inline",
      items: $notesList.map(noteFilter),
      style: "grid-gap:unset;",
      selectedIndex
    }, {
      selectedIndex: ($$value) => {
        selectedIndex = $$value;
        $$settled = false;
      }
    }, {})}</div>
    ${validate_component(Editor, "Editor").$$render($$result, {}, {}, {})}
</main>`;
  } while (!$$settled);
  $$unsubscribe_editorData();
  $$unsubscribe_notesList();
  return $$rendered;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Notes
});
var tile_svelte_svelte_type_style_lang = ".tile-rec.svelte-22yvl3{position:absolute;bottom:1em}.clearfix.svelte-22yvl3{background:#000c;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);-moz-backdrop-filter:blur(4px)}";
const css$2 = {
  code: ".tile-rec.svelte-22yvl3{position:absolute;bottom:1em}.clearfix.svelte-22yvl3{background:#000c;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);-moz-backdrop-filter:blur(4px)}",
  map: '{"version":3,"file":"tile.svelte","sources":["tile.svelte"],"sourcesContent":["<script>\\n    export let data = {};\\n\\n    import { ClickableTile } from \\"$hakama\\";\\n    import { onMount } from \\"svelte\\";\\n\\n    const type_process = ({ type, url }) => {\\n        url = new URL(url || \\"https://trial.nukes.in\\")?.hostname.replace(\\n            /^www\\\\./,\\n            \\"\\"\\n        );\\n        if (type === \\"Article\\") return (type = `Article (${url})`);\\n        else return type;\\n    };\\n\\n    let holders = {\\n        time: \\"\\",\\n    };\\n\\n    onMount(() => {\\n        holders.time = time.since(data?.date);\\n    });\\n<\/script>\\n\\n<ClickableTile\\n    class=\\"tile\\"\\n    href={data?.url}\\n    id={data?.id}\\n    style=\\"background:url({data?.image}) center center no-repeat;background-size: cover;\\"\\n>\\n    <div class=\\"clearfix p20 w-100 h-100\\">\\n        <div class=\\"\u0192 \u2206-bw\\">\\n            <span>{type_process(data)}</span>\\n            <svg viewBox=\\"0 0 32 32\\" width=\\"16\\" height=\\"16\\" stroke=\\"#fff\\">\\n                <path d=\\"M2 30 L30 2 M30 30 L2 2\\" />\\n            </svg>\\n        </div>\\n        <h1>{data?.title}</h1>\\n        <div class=\\"tile-rec\\">\\n            <span>{holders.time}</span>\\n            (<span>{data?.from}</span>)\\n        </div>\\n    </div>\\n</ClickableTile>\\n\\n<style>\\n    .tile-rec {\\n        position: absolute;\\n        bottom: 1em;\\n    }\\n    .clearfix {\\n        background: #000c;\\n        backdrop-filter: blur(4px);\\n        -webkit-backdrop-filter: blur(4px);\\n        -moz-backdrop-filter: blur(4px);\\n    }\\n</style>\\n"],"names":[],"mappings":"AA8CI,SAAS,cAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,AACf,CAAC,AACD,SAAS,cAAC,CAAC,AACP,UAAU,CAAE,KAAK,CACjB,eAAe,CAAE,KAAK,GAAG,CAAC,CAC1B,uBAAuB,CAAE,KAAK,GAAG,CAAC,CAClC,oBAAoB,CAAE,KAAK,GAAG,CAAC,AACnC,CAAC"}'
};
const Tile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data: data2 = {} } = $$props;
  const type_process = ({ type, url }) => {
    var _a;
    url = (_a = new URL(url || "https://trial.nukes.in")) == null ? void 0 : _a.hostname.replace(/^www\./, "");
    if (type === "Article")
      return type = `Article (${url})`;
    else
      return type;
  };
  let holders = { time: "" };
  if ($$props.data === void 0 && $$bindings.data && data2 !== void 0)
    $$bindings.data(data2);
  $$result.css.add(css$2);
  return `${validate_component(ClickableTile, "ClickableTile").$$render($$result, {
    class: "tile",
    href: data2 == null ? void 0 : data2.url,
    id: data2 == null ? void 0 : data2.id,
    style: "background:url(" + (data2 == null ? void 0 : data2.image) + ") center center no-repeat;background-size: cover;"
  }, {}, {
    default: () => `<div class="${"clearfix p20 w-100 h-100 svelte-22yvl3"}"><div class="${"\u0192 \u2206-bw"}"><span>${escape(type_process(data2))}</span>
            <svg viewBox="${"0 0 32 32"}" width="${"16"}" height="${"16"}" stroke="${"#fff"}"><path d="${"M2 30 L30 2 M30 30 L2 2"}"></path></svg></div>
        <h1>${escape(data2 == null ? void 0 : data2.title)}</h1>
        <div class="${"tile-rec svelte-22yvl3"}"><span>${escape(holders.time)}</span>
            (<span>${escape(data2 == null ? void 0 : data2.from)}</span>)
        </div></div>`
  })}`;
});
var tile = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Tile
});
var adder_svelte_svelte_type_style_lang = "form.svelte-1ymwcic.svelte-1ymwcic{opacity:0.5;transition:opacity 0.2s ease}form.svelte-1ymwcic.svelte-1ymwcic:hover{opacity:1}form.svelte-1ymwcic:hover~.add.svelte-1ymwcic{opacity:0}form.svelte-1ymwcic .rec.svelte-1ymwcic{position:absolute;bottom:1em}svg.svelte-1ymwcic.svelte-1ymwcic{height:28px;width:28px;margin:2px 5px 0 0;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none}.clfx.svelte-1ymwcic.svelte-1ymwcic{background:#0008;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);-moz-backdrop-filter:blur(4px)}.add.svelte-1ymwcic.svelte-1ymwcic{color:#000;position:absolute;bottom:1em;right:1em}";
const css$1 = {
  code: "form.svelte-1ymwcic.svelte-1ymwcic{opacity:0.5;transition:opacity 0.2s ease}form.svelte-1ymwcic.svelte-1ymwcic:hover{opacity:1}form.svelte-1ymwcic:hover~.add.svelte-1ymwcic{opacity:0}form.svelte-1ymwcic .rec.svelte-1ymwcic{position:absolute;bottom:1em}svg.svelte-1ymwcic.svelte-1ymwcic{height:28px;width:28px;margin:2px 5px 0 0;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none}.clfx.svelte-1ymwcic.svelte-1ymwcic{background:#0008;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);-moz-backdrop-filter:blur(4px)}.add.svelte-1ymwcic.svelte-1ymwcic{color:#000;position:absolute;bottom:1em;right:1em}",
  map: '{"version":3,"file":"adder.svelte","sources":["adder.svelte"],"sourcesContent":["<script>\\n    import { TextInput, Tile } from \\"$hakama\\";\\n    import { getMetadata } from \\"./functions\\";\\n\\n    let data = {\\n        title: \\"\\",\\n        type: \\"\\",\\n        url: \\"https://github.com/IndiQ-Meetups/Events/tree/main/collaborations/IISc-IEEE-ComSoc/qComm-workshop-2021\\",\\n        image: \\"\\",\\n        from: \\"\\",\\n    };\\n\\n    const getImage = (e) => {\\n        const holder = \u0192(\\"form\\");\\n        if (data.url.includes(\\"youtube\\")) {\\n            data.image =\\n                \\"https://i.ytimg.com/vi/\\" +\\n                data.url.split(\\"v=\\")[1].split(\\"&\\")[0] +\\n                \\"/maxresdefault.jpg\\";\\n        } else {\\n            getMetadata(data.url).then((res) => {\\n                data.image = res.meta.image.url;\\n            });\\n        }\\n        holder.style.background = `url(${data.image}) center center no-repeat;`;\\n        holder.style.backgroundSize = `cover`;\\n    };\\n\\n    const preprocess = (e) => {\\n        console.log(data, data.url);\\n    };\\n<\/script>\\n\\n<Tile\\n    class=\\"tile\\"\\n    id=\\"adding-tile\\"\\n    style=\\"background:url(/assets/Amos.svg) center center no-repeat;\\"\\n>\\n    <form class=\\"clfx p20 w-100 h-100\\" on:submit|preventDefault={preprocess}>\\n        <TextInput size=\\"sm\\" placeholder=\\"Type\\" bind:value={data.type} />\\n        <TextInput size=\\"lg\\" placeholder=\\"Title\\" bind:value={data.title} />\\n        <br />\\n        <div class=\\"extra \u0192\\">\\n            <svg viewBox=\\"0 0 32 32\\">\\n                <path\\n                    d=\\"M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15\\"\\n                />\\n            </svg>\\n            <TextInput\\n                size=\\"sm\\"\\n                placeholder=\\"Link\\"\\n                on:blur={getImage}\\n                bind:value={data.url}\\n            />\\n        </div>\\n        <div class=\\"extra \u0192\\">\\n            <svg viewBox=\\"0 0 32 32\\">\\n                <path\\n                    d=\\"M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24\\"\\n                />\\n                <circle cx=\\"10\\" cy=\\"9\\" r=\\"3\\" />\\n            </svg>\\n            <TextInput size=\\"sm\\" placeholder=\\"Image\\" bind:value={data.image} />\\n        </div>\\n        <span class=\\"rec\\">\\n            <TextInput size=\\"sm\\" placeholder=\\"Rec\\" bind:value={data.from} />\\n        </span>\\n        <input class=\\"o-0\\" type=\\"submit\\" value=\\"Go\\" />\\n    </form>\\n    <div class=\\"add\\">Add More...</div>\\n</Tile>\\n\\n<style type=\\"text/scss\\">form {\\n  opacity: 0.5;\\n  transition: opacity 0.2s ease;\\n}\\nform:hover {\\n  opacity: 1;\\n}\\nform:hover ~ .add {\\n  opacity: 0;\\n}\\nform .rec {\\n  position: absolute;\\n  bottom: 1em;\\n}\\n\\nsvg {\\n  height: 28px;\\n  width: 28px;\\n  margin: 2px 5px 0 0;\\n  stroke: #fff;\\n  stroke-width: 2;\\n  stroke-linecap: round;\\n  stroke-linejoin: round;\\n  fill: none;\\n}\\n\\n.clfx {\\n  background: #0008;\\n  backdrop-filter: blur(4px);\\n  -webkit-backdrop-filter: blur(4px);\\n  -moz-backdrop-filter: blur(4px);\\n}\\n\\n.add {\\n  color: #000;\\n  position: absolute;\\n  bottom: 1em;\\n  right: 1em;\\n}</style>\\n"],"names":[],"mappings":"AAwEwB,IAAI,8BAAC,CAAC,AAC5B,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAAI,AAC/B,CAAC,AACD,kCAAI,MAAM,AAAC,CAAC,AACV,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,mBAAI,MAAM,CAAG,IAAI,eAAC,CAAC,AACjB,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,mBAAI,CAAC,IAAI,eAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,AACb,CAAC,AAED,GAAG,8BAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACnB,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,CAAC,CACf,cAAc,CAAE,KAAK,CACrB,eAAe,CAAE,KAAK,CACtB,IAAI,CAAE,IAAI,AACZ,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,UAAU,CAAE,KAAK,CACjB,eAAe,CAAE,KAAK,GAAG,CAAC,CAC1B,uBAAuB,CAAE,KAAK,GAAG,CAAC,CAClC,oBAAoB,CAAE,KAAK,GAAG,CAAC,AACjC,CAAC,AAED,IAAI,8BAAC,CAAC,AACJ,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GAAG,AACZ,CAAC"}'
};
const Adder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data2 = {
    title: "",
    type: "",
    url: "https://github.com/IndiQ-Meetups/Events/tree/main/collaborations/IISc-IEEE-ComSoc/qComm-workshop-2021",
    image: "",
    from: ""
  };
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Tile$1, "Tile").$$render($$result, {
      class: "tile",
      id: "adding-tile",
      style: "background:url(/assets/Amos.svg) center center no-repeat;"
    }, {}, {
      default: () => `<form class="${"clfx p20 w-100 h-100 svelte-1ymwcic"}">${validate_component(TextInput, "TextInput").$$render($$result, {
        size: "sm",
        placeholder: "Type",
        value: data2.type
      }, {
        value: ($$value) => {
          data2.type = $$value;
          $$settled = false;
        }
      }, {})}
        ${validate_component(TextInput, "TextInput").$$render($$result, {
        size: "lg",
        placeholder: "Title",
        value: data2.title
      }, {
        value: ($$value) => {
          data2.title = $$value;
          $$settled = false;
        }
      }, {})}
        <br>
        <div class="${"extra \u0192"}"><svg viewBox="${"0 0 32 32"}" class="${"svelte-1ymwcic"}"><path d="${"M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15"}"></path></svg>
            ${validate_component(TextInput, "TextInput").$$render($$result, {
        size: "sm",
        placeholder: "Link",
        value: data2.url
      }, {
        value: ($$value) => {
          data2.url = $$value;
          $$settled = false;
        }
      }, {})}</div>
        <div class="${"extra \u0192"}"><svg viewBox="${"0 0 32 32"}" class="${"svelte-1ymwcic"}"><path d="${"M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24"}"></path><circle cx="${"10"}" cy="${"9"}" r="${"3"}"></circle></svg>
            ${validate_component(TextInput, "TextInput").$$render($$result, {
        size: "sm",
        placeholder: "Image",
        value: data2.image
      }, {
        value: ($$value) => {
          data2.image = $$value;
          $$settled = false;
        }
      }, {})}</div>
        <span class="${"rec svelte-1ymwcic"}">${validate_component(TextInput, "TextInput").$$render($$result, {
        size: "sm",
        placeholder: "Rec",
        value: data2.from
      }, {
        value: ($$value) => {
          data2.from = $$value;
          $$settled = false;
        }
      }, {})}</span>
        <input class="${"o-0"}" type="${"submit"}" value="${"Go"}"></form>
    <div class="${"add svelte-1ymwcic"}">Add More...</div>`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var adder = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Adder
});
const Stack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const Rank = (a, b) => a.rank > b.rank ? 1 : -1;
  return `<section class="${"p5"}"><div class="${"\u0192 \u0192\u2211"}">${validate_component(Adder, "Adder").$$render($$result, {}, {}, {})}
        ${each(orbs.sort(Rank), (orb) => `${validate_component(Tile, "Stick").$$render($$result, { data: orb }, {}, {})}`)}</div>
    <style>.tile {
            padding: 0;
            width: 25%;
            height: 300px;
        }
    </style></section>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Stack
});
class Timer {
  constructor(options2 = "") {
    __publicField(this, "measureStop", (label) => +new Date() - this._.measures[label || ""]);
    this.defaultOptions = {
      tick: 1,
      onstart: null,
      ontick: null,
      onpause: null,
      onstop: null,
      onend: null
    };
    this._ = {
      id: +new Date(),
      options: {},
      duration: 0,
      status: "initialized",
      start: 0,
      measures: []
    };
    for (let prop in this.defaultOptions)
      this._.options[prop] = this.defaultOptions[prop];
    this.options(options2);
  }
  start(duration2) {
    if (!+duration2 && !this._.duration)
      return this;
    duration2 && (duration2 *= 1e3);
    if (this._.timeout && this._.status === "started")
      return this;
    this._.duration = duration2 || this._.duration;
    this._.timeout = setTimeout(this.end.bind(this), this._.duration);
    if (typeof this._.options.ontick === "function")
      this._.interval = setInterval(function() {
        this.trigger.call(this, "ontick", this.getDuration());
      }.bind(this), +this._.options.tick * 1e3);
    this._.start = +new Date();
    this._.status = "started";
    this.trigger.call(this, "onstart", this.getDuration());
    return this;
  }
  pause() {
    if (this._.status !== "started")
      return this;
    this._.duration -= +new Date() - this._.start;
    this.clear.call(this, false);
    this._.status = "paused";
    this.trigger.call(this, "onpause");
    return this;
  }
  stop() {
    if (!/started|paused/.test(this._.status))
      return this;
    this.clear.call(this, true);
    this._.status = "stopped";
    this.trigger.call(this, "onstop");
    return this;
  }
  getDuration() {
    if (this._.status === "started")
      return this._.duration - (+new Date() - this._.start);
    if (this._.status === "paused")
      return this._.duration;
    return 0;
  }
  getStatus() {
    return this._.status;
  }
  options(option, value) {
    if (option && value)
      this._.options[option] = value;
    if (!value && typeof option === "object") {
      for (let prop in option)
        if (this._.options.hasOwnProperty(prop))
          this._.options[prop] = option[prop];
    }
    return this;
  }
  on(option, value) {
    if (typeof option !== "string" || typeof value !== "function")
      return this;
    if (!/^on/.test(option))
      option = "on" + option;
    if (this._.options.hasOwnProperty(option))
      this._.options[option] = value;
    return this;
  }
  off(option) {
    if (typeof option !== "string")
      return this;
    option = option.toLowerCase();
    if (option === "all") {
      this._.options = this.defaultOptions;
      return this;
    }
    if (!/^on/.test(option))
      option = "on" + option;
    if (this._.options.hasOwnProperty(option))
      this._.options[option] = this.defaultOptions[option];
    return this;
  }
  measureStart(label) {
    this._.measures[label || ""] = +new Date();
    return this;
  }
  end() {
    this.clear.call(this);
    this._.status = "stopped";
    this.trigger.call(this, "onend");
  }
  trigger(event) {
    let callback = this._.options[event], args = [].slice.call(arguments, 1);
    typeof callback === "function" && callback.apply(this, args);
  }
  clear(clearDuration) {
    clearTimeout(this._.timeout);
    clearInterval(this._.interval);
    if (clearDuration === true)
      this._.duration = 0;
  }
}
var time_svelte_svelte_type_style_lang = ":root{--primary:#ccc8;--disabled:#0004;--hover:#fff;--active:var(--hover)}section.svelte-sdzu2w.svelte-sdzu2w{color:#fff;align-items:center;justify-content:center}svg.svelte-sdzu2w.svelte-sdzu2w{margin:10px;width:24px;height:24px;stroke:var(--primary);stroke-linecap:round;stroke-linejoin:round;stroke-width:3}svg.svelte-sdzu2w.svelte-sdzu2w:hover{--primary:var(--hover);stroke:var(--hover)}input:checked+label.svelte-sdzu2w svg.svelte-sdzu2w{stroke:var(--active)}#looptime.svelte-sdzu2w.svelte-sdzu2w{position:relative;top:-0.85em;color:#fff}#looptime[disabled].svelte-sdzu2w.svelte-sdzu2w{display:none}#timer.svelte-sdzu2w.svelte-sdzu2w{--size:120px;height:calc(var(--size) + 30px);font-size:var(--size);outline:none}#top.svelte-sdzu2w.svelte-sdzu2w{position:fixed;left:0;right:0;top:0}";
const css = {
  code: ":root{--primary:#ccc8;--disabled:#0004;--hover:#fff;--active:var(--hover)}section.svelte-sdzu2w.svelte-sdzu2w{color:#fff;align-items:center;justify-content:center}svg.svelte-sdzu2w.svelte-sdzu2w{margin:10px;width:24px;height:24px;stroke:var(--primary);stroke-linecap:round;stroke-linejoin:round;stroke-width:3}svg.svelte-sdzu2w.svelte-sdzu2w:hover{--primary:var(--hover);stroke:var(--hover)}input:checked+label.svelte-sdzu2w svg.svelte-sdzu2w{stroke:var(--active)}#looptime.svelte-sdzu2w.svelte-sdzu2w{position:relative;top:-0.85em;color:#fff}#looptime[disabled].svelte-sdzu2w.svelte-sdzu2w{display:none}#timer.svelte-sdzu2w.svelte-sdzu2w{--size:120px;height:calc(var(--size) + 30px);font-size:var(--size);outline:none}#top.svelte-sdzu2w.svelte-sdzu2w{position:fixed;left:0;right:0;top:0}",
  map: '{"version":3,"file":"time.svelte","sources":["time.svelte"],"sourcesContent":["<script>\\n    import Timer from \\"$lib/shared/timer\\";\\n    import { Kron } from \\"$lib/shared/molecular\\";\\n\\n    let //\\n        loop = false,\\n        loopable = \\"00:00:10\\",\\n        running = true,\\n        paused = false,\\n        time = \\"00:00:10\\";\\n\\n    const endHandler = () => {\\n        if (loop) startHandler(loopable);\\n        else stopHandler();\\n    };\\n\\n    const displayHandler = (ms) => {\\n        time = new Kron().secondsToClock(Math.round(ms / 1000));\\n        document.title = time;\\n    };\\n\\n    const stopHandler = () => {\\n        clock.stop();\\n        time = \\"00:00:00\\";\\n        running = false;\\n        paused = true;\\n    };\\n\\n    const startHandler = (duration) => {\\n        running = true;\\n        paused = false;\\n        if (paused) clock.start();\\n        else {\\n            time = duration;\\n            clock.start(new Kron().clockToSeconds(duration));\\n        }\\n    };\\n\\n    const handleClick = (e) => {\\n        const func = e.target.id || e.target.parentElement.id;\\n        if (func === \\"playpause\\") {\\n            if (running) {\\n                clock.pause();\\n                paused = true;\\n                running = false;\\n            } else startHandler(time);\\n        }\\n        if (func === \\"fullstop\\") stopHandler();\\n    };\\n\\n    let clock = new Timer({\\n        tick: 1,\\n        ontick: displayHandler,\\n        onend: endHandler,\\n    });\\n\\n    startHandler(time);\\n<\/script>\\n\\n<svelte:head>\\n    <style>\\n        body {\\n            background: #f52;\\n        }\\n    </style>\\n</svelte:head>\\n\\n<section class=\\"h-1vh \u0192-col \u0192\u2211\\">\\n    <div class=\\"w-100\\" id=\\"top\\">\\n        <input\\n            type=\\"checkbox\\"\\n            name=\\"v2\\"\\n            id=\\"v2\\"\\n            bind:checked={loop}\\n            style=\\"display:none;\\"\\n        />\\n        <label for=\\"v2\\">\\n            <svg id=\\"loop\\" viewBox=\\"0 0 32 32\\" on:click={handleClick}>\\n                <path\\n                    fill=\\"none\\"\\n                    d=\\"M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2\\"\\n                />\\n            </svg>\\n            <input\\n                id=\\"looptime\\"\\n                type=\\"text\\"\\n                disabled={!loop}\\n                bind:value={loopable}\\n            />\\n        </label>\\n    </div>\\n    <div class=\\"\u2020c\\" contenteditable id=\\"timer\\" bind:innerHTML={time} />\\n    <div class=\\"\u2020c o-75\\" id=\\"controls\\">\\n        <svg id=\\"playpause\\" viewBox=\\"0 0 32 32\\" on:click={handleClick}>\\n            {#if running}\\n                <path d=\\"M23 2 L23 28 M9 2 L9 28\\" fill=\\"none\\" />\\n            {:else}\\n                <polygon points=\\"0,0 32,16 0,32\\" fill=\\"var(--primary)\\" />\\n            {/if}\\n        </svg>\\n        <svg\\n            id=\\"fullstop\\"\\n            viewBox=\\"0 0 32 32\\"\\n            fill=\\"var(--primary)\\"\\n            on:click={handleClick}\\n        >\\n            <rect x=\\"0\\" y=\\"0\\" width=\\"32\\" height=\\"32\\" />\\n        </svg>\\n    </div>\\n</section>\\n\\n<style type=\\"text/scss\\">:root {\\n  --primary: #ccc8;\\n  --disabled: #0004;\\n  --hover: #fff;\\n  --active: var(--hover);\\n}\\n\\nsection {\\n  color: #fff;\\n  align-items: center;\\n  justify-content: center;\\n}\\n\\nsvg {\\n  margin: 10px;\\n  width: 24px;\\n  height: 24px;\\n  stroke: var(--primary);\\n  stroke-linecap: round;\\n  stroke-linejoin: round;\\n  stroke-width: 3;\\n}\\nsvg:hover {\\n  --primary: var(--hover);\\n  stroke: var(--hover);\\n}\\n\\ninput:checked + label svg {\\n  stroke: var(--active);\\n}\\n\\n#looptime {\\n  position: relative;\\n  top: -0.85em;\\n  color: #fff;\\n}\\n#looptime[disabled] {\\n  display: none;\\n}\\n\\n#timer {\\n  --size: 120px;\\n  height: calc(var(--size) + 30px);\\n  font-size: var(--size);\\n  outline: none;\\n}\\n\\n#top {\\n  position: fixed;\\n  left: 0;\\n  right: 0;\\n  top: 0;\\n}</style>\\n"],"names":[],"mappings":"AA+GwB,KAAK,AAAC,CAAC,AAC7B,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,YAAY,AACxB,CAAC,AAED,OAAO,4BAAC,CAAC,AACP,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AACzB,CAAC,AAED,GAAG,4BAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,SAAS,CAAC,CACtB,cAAc,CAAE,KAAK,CACrB,eAAe,CAAE,KAAK,CACtB,YAAY,CAAE,CAAC,AACjB,CAAC,AACD,+BAAG,MAAM,AAAC,CAAC,AACT,SAAS,CAAE,YAAY,CACvB,MAAM,CAAE,IAAI,OAAO,CAAC,AACtB,CAAC,AAED,KAAK,QAAQ,CAAG,mBAAK,CAAC,GAAG,cAAC,CAAC,AACzB,MAAM,CAAE,IAAI,QAAQ,CAAC,AACvB,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,OAAO,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AACD,SAAS,CAAC,QAAQ,CAAC,4BAAC,CAAC,AACnB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAChC,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,IAAI,4BAAC,CAAC,AACJ,QAAQ,CAAE,KAAK,CACf,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,CAAC,AACR,CAAC"}'
};
const Time = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loop = false, loopable = "00:00:10", running = true, paused = false, time2 = "00:00:10";
  const endHandler = () => {
    stopHandler();
  };
  const displayHandler = (ms) => {
    time2 = new Kron().secondsToClock(Math.round(ms / 1e3));
    document.title = time2;
  };
  const stopHandler = () => {
    clock.stop();
    time2 = "00:00:00";
    running = false;
    paused = true;
  };
  const startHandler = (duration2) => {
    running = true;
    paused = false;
    if (paused)
      clock.start();
    else {
      time2 = duration2;
      clock.start(new Kron().clockToSeconds(duration2));
    }
  };
  let clock = new Timer({
    tick: 1,
    ontick: displayHandler,
    onend: endHandler
  });
  startHandler(time2);
  $$result.css.add(css);
  return `${$$result.head += `<style data-svelte="svelte-17qyo1u">body {
            background: #f52;
        }
    </style>`, ""}

<section class="${"h-1vh \u0192-col \u0192\u2211 svelte-sdzu2w"}"><div class="${"w-100 svelte-sdzu2w"}" id="${"top"}"><input type="${"checkbox"}" name="${"v2"}" id="${"v2"}" style="${"display:none;"}"${add_attribute("checked", loop, 1)}>
        <label for="${"v2"}" class="${"svelte-sdzu2w"}"><svg id="${"loop"}" viewBox="${"0 0 32 32"}" class="${"svelte-sdzu2w"}"><path fill="${"none"}" d="${"M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2"}"></path></svg>
            <input id="${"looptime"}" type="${"text"}" ${"disabled"} class="${"svelte-sdzu2w"}"${add_attribute("value", loopable, 0)}></label></div>
    <div class="${"\u2020c svelte-sdzu2w"}" contenteditable id="${"timer"}">${(($$value) => $$value === void 0 ? `` : $$value)(time2)}</div>
    <div class="${"\u2020c o-75"}" id="${"controls"}"><svg id="${"playpause"}" viewBox="${"0 0 32 32"}" class="${"svelte-sdzu2w"}">${running ? `<path d="${"M23 2 L23 28 M9 2 L9 28"}" fill="${"none"}"></path>` : `<polygon points="${"0,0 32,16 0,32"}" fill="${"var(--primary)"}"></polygon>`}</svg>
        <svg id="${"fullstop"}" viewBox="${"0 0 32 32"}" fill="${"var(--primary)"}" class="${"svelte-sdzu2w"}"><rect x="${"0"}" y="${"0"}" width="${"32"}" height="${"32"}"></rect></svg></div>
</section>`;
});
var time = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Time
});
export { init, render };
