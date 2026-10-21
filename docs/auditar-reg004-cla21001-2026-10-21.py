# SPDX-License-Identifier: Apache-2.0
"""Reejecuta diagnósticos sintéticos sin sobrescribir evidencias anteriores."""
from pathlib import Path
import os, subprocess, json, tempfile

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
TEMP = Path(os.environ['TEMP'])
SCRATCH = Path(tempfile.mkdtemp(prefix='reg004-cla21001-'))
WRAPPER = SCRATCH / 'replay.cjs'
WRAPPER.write_text(r"""'use strict';
const fs=require('fs'),path=require('path'),Module=require('module');
const root=process.cwd(),docs=path.join(root,'docs');
const read=fs.readFileSync,write=fs.writeFileSync;
fs.readFileSync=function(f,...a){let v=read(f,...a);
 if(typeof v==='string'&&String(f).endsWith('.cjs')&&path.dirname(String(f))===docs){
  v=v.replace("verificar: texto => assert.ok(texto.includes('(el mismo programa)'))", "verificar: texto => assert.ok(texto.includes('cambió solo en espacios o saltos de línea') && !texto.includes('(el mismo programa)'))");
  v=v.replace("programa('control-espacios-internos-fuera-literal', 'void loop() { delay(500); }\\n', 'void   loop() {   delay(500); }\\n', false);", "programa('control-espacios-internos-fuera-literal', 'void loop() { delay(500); }\\n', 'void   loop() {   delay(500); }\\n', true);");
 }return v;};
fs.writeFileSync=function(f,...a){
 if(path.dirname(path.resolve(String(f)))===docs&&String(f).endsWith('.json')) {
  const name=path.basename(String(f)).replace(/^reg004-/, 'reg004-cla21001-replay-');
  f=path.join(docs,name);
  if(fs.existsSync(f)) throw new Error('No se sobrescribe evidencia: '+f);
 }
 return write(f,...a);
};
const file=process.argv[2],args=process.argv.slice(3);
process.argv=[process.execPath,file,...args];
const m=new Module(file,module);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));
m._compile(fs.readFileSync(file,'utf8'),file);
""", encoding='utf-8')

def run(label, file, args=()):
    r = subprocess.run(['node', str(WRAPPER), str(file), *args], cwd=ROOT,
                       capture_output=True, encoding='utf-8', timeout=120)
    (DOCS / f'reg004-cla21001-{label}-2026-10-21.log').write_text(
        r.stdout + r.stderr + f'\nexit={r.returncode}\n', encoding='utf-8')
    print(label, 'exit=', r.returncode, '\n', '\n'.join(r.stdout.splitlines()[-3:]), flush=True)
    return {'label': label, 'script': str(file), 'args': list(args), 'exit': r.returncode}

if __name__ == '__main__':
    results=[]
    for label, name in [('ampliacion-anterior','ampliacion'), ('bordes-anteriores','bordes-integridad'), ('e1','integral-e1'), ('e2','integral-e2')]:
        results.append(run(label, TEMP / f'reg004-cla009-{name}-2026-10-20.cjs'))
    for arg in ['original','residuales','cierres','ampliacion','originales','adicionales','bordes','lienzo']:
        results.append(run('historico-'+arg, DOCS / 'verificar-reg004-cla004-2026-10-20.cjs', [arg]))
    (DOCS / 'reg004-cla21001-replay-ejecuciones-2026-10-21.json').write_text(
        json.dumps({'scratch':str(SCRATCH),'resultados':results},ensure_ascii=False,indent=2),encoding='utf-8')
