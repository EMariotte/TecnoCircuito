// Harness de auditoría: abre Electron con aislamiento/preload iguales a los del producto.
// No carga el main del producto ni acredita IPC/compilador/instalación; esos tienen pruebas separadas.
const {app,BrowserWindow,session}=require('electron');
const path=require('path');
const TB=path.resolve(__dirname,'../../../TecnoBloques');
app.commandLine.appendSwitch('disable-background-networking');
globalThis.auditRequests=[];
app.whenReady().then(()=>{
  session.defaultSession.webRequest.onBeforeRequest({urls:['http://*/*','https://*/*']},(d,reply)=>{globalThis.auditRequests.push({url:d.url,resourceType:d.resourceType});reply({cancel:true});});
  globalThis.auditWindow=new BrowserWindow({width:1366,height:860,show:false,webPreferences:{preload:path.join(TB,'escritorio/preload.js'),contextIsolation:true,nodeIntegration:false}});
  globalThis.auditWindow.once('ready-to-show',()=>globalThis.auditWindow.showInactive());
  globalThis.auditWindow.loadURL('about:blank');
});
app.on('window-all-closed',()=>app.quit());
