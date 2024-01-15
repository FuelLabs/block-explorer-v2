"use strict";(self.webpackChunkexplorer=self.webpackChunkexplorer||[]).push([[956],{95:function(n,e,t){t.d(e,{D:function(){return g}});var r,s,i,o,d=t(2524),a=t.n(d),c=t(2791),l=t(3422),u=t(1031),x=t(168),h=t(6444),j=h.ZP.div(r||(r=(0,x.Z)(["\n  padding: 0 40px 48px;\n  width: 100%;\n  max-width: 432px;\n  border-radius: 6px;\n  box-shadow: 0 0 25px 0 #58c09b;\n  border: solid 1px #58c09c;\n  background-color: #021d17;\n\n  @media screen and (max-width: 425px) {\n    padding: 0 24px 48px;\n  }\n"]))),f=h.ZP.h2(s||(s=(0,x.Z)(["\n  margin: 20px 0;\n  font-family: SFProDisplay;\n  font-size: 25px;\n  font-weight: 600;\n  text-align: center;\n  color: #f8fefc;\n"]))),p=h.ZP.p(i||(i=(0,x.Z)(["\n  margin: 16px 0 40px;\n  font-family: SFProText;\n  font-size: 15px;\n  font-weight: 500;\n  line-height: 18px;\n  text-align: center;\n  color: #f8fefc;\n  text-overflow: ellipsis;\n  overflow: hidden;\n"]))),m=h.ZP.div(o||(o=(0,x.Z)(["\n  margin: 0 auto;\n  width: fit-content;\n"]))),v=t(184);function g(n){var e=(0,c.useRef)(null);return(0,l.t)(e,(function(){n.onClose()})),(0,v.jsx)(u.u,{children:(0,v.jsxs)(j,{ref:e,children:[(0,v.jsx)(f,{children:"QR Code"}),(0,v.jsx)(p,{children:n.address}),(0,v.jsx)(m,{children:(0,v.jsx)(a(),{value:n.address,fgColor:"#f8fefc",bgColor:"#021d17"})})]})})}},956:function(n,e,t){t.r(e),t.d(e,{default:function(){return P}});var r=t(1413),s=t(9439),i=t(3193),o=t(2791),d=t(7689),a=t(7134),c=t(95),l=t(1391),u=t(7033),x=t(1627),h=t(7253),j=t(8658),f=t(184);function p(n){var e=n.balances;return(0,f.jsxs)(x.xJ,{children:[(0,f.jsxs)(x.$d,{children:[(0,f.jsx)(x.uU,{children:"Balances"}),(0,f.jsx)(x.hk,{children:(0,f.jsxs)(j.a_,{children:["Showing ",(0,f.jsx)(j._m,{children:(null===e||void 0===e?void 0:e.length)||"0"})," out of ",(0,f.jsx)(j._m,{children:(null===e||void 0===e?void 0:e.length)||"0"})," balances"]})})]}),(0,f.jsx)(x.y6,{children:(0,f.jsxs)(x.iA,{children:[(0,f.jsxs)(x.U8,{children:[(0,f.jsx)(x.bi,{children:"Asset ID"}),(0,f.jsx)(x.bi,{children:"Amount"})]}),e.map((function(n){return(0,f.jsxs)(x.SC,{children:[(0,f.jsx)(x.pj,{children:(0,h.n)(n.assetId)}),(0,f.jsx)(x.pj,{children:(0,i.bn)(n.amount).format({precision:i.cSv})})]},n.assetId)}))]})})]})}function m(n){var e=n.transactions;return(0,f.jsxs)(x.xJ,{children:[(0,f.jsxs)(x.$d,{children:[(0,f.jsx)(x.uU,{children:"Transactions"}),(0,f.jsx)(x.hk,{children:(0,f.jsxs)(j.a_,{children:["Showing ",(0,f.jsx)(j._m,{children:(null===e||void 0===e?void 0:e.length)||"0"})," out of ",(0,f.jsx)(j._m,{children:(null===e||void 0===e?void 0:e.length)||"0"})," transactions"]})})]}),(0,f.jsx)(x.y6,{children:(0,f.jsxs)(x.iA,{children:[(0,f.jsxs)(x.U8,{children:[(0,f.jsx)(x.bi,{children:"Tx Hash"}),(0,f.jsx)(x.bi,{children:"Type"}),(0,f.jsx)(x.bi,{children:"Age"}),(0,f.jsx)(x.bi,{children:"From"})]}),e.map((function(n){var e;return(0,f.jsxs)(x.SC,{children:[(0,f.jsx)(x.pj,{children:(0,f.jsx)(j.f1,{to:"/transaction/".concat(n.id),children:n.id})}),(0,f.jsx)(x.pj,{children:n.isScript?"Script":"Create"}),(0,f.jsx)(x.pj,{children:(0,u.Mp)(n)}),(0,f.jsx)(x.pj,{children:null===(e=n.inputs)||void 0===e?void 0:e.map((function(n,e){return function(){switch(n.__typename){case"InputCoin":return(0,f.jsx)(j.jn,{children:(0,f.jsx)(j.Zb,{to:"/address/".concat(n.owner),children:(0,h.n)(n.owner)})},e);case"InputContract":return(0,f.jsx)(j.Aw,{to:"",children:(0,h.n)(n.contract.id)},e);default:return n.__typename}}()}))})]},n.id)}))]})})]})}var v,g,C,w=t(168),b=t(1989),y=t(9226),I={},Z=((0,b.Ps)(v||(v=(0,w.Z)(["\n    fragment AddressPageCoin on Coin {\n  utxoId\n  owner\n  amount\n  assetId\n  maturity\n  blockCreated\n  txCreatedIdx\n}\n    "]))),(0,b.Ps)(g||(g=(0,w.Z)(["\n    fragment AddressPageTransaction on Transaction {\n  id\n  inputContracts {\n    id\n  }\n  inputAssetIds\n  gasPrice\n  maturity\n  isScript\n  receiptsRoot\n  witnesses\n  scriptGasLimit\n  outputs {\n    __typename\n    ... on CoinOutput {\n      to\n      amount\n      assetId\n    }\n    ... on ContractOutput {\n      inputIndex\n      balanceRoot\n      stateRoot\n    }\n    ... on ChangeOutput {\n      to\n      amount\n      assetId\n    }\n    ... on VariableOutput {\n      to\n      amount\n      assetId\n    }\n    ... on ContractCreated {\n      contract {\n        id\n      }\n    }\n  }\n  inputs {\n    __typename\n    ... on InputCoin {\n      utxoId\n      owner\n      amount\n      assetId\n      witnessIndex\n      maturity\n      predicate\n      predicateData\n    }\n    ... on InputContract {\n      utxoId\n      balanceRoot\n      stateRoot\n      contract {\n        id\n      }\n    }\n  }\n  status {\n    ... on SubmittedStatus {\n      time\n    }\n    ... on SuccessStatus {\n      time\n    }\n    ... on FailureStatus {\n      time\n    }\n  }\n}\n    "])))),S=(0,b.Ps)(C||(C=(0,w.Z)(["\n    query AddressPageQuery($first: Int, $owner: Address!) {\n  balances(filter: {owner: $owner}, first: $first) {\n    edges {\n      node {\n        amount\n        assetId\n      }\n    }\n  }\n  transactionsByOwner(first: $first, owner: $owner) {\n    edges {\n      node {\n        ...AddressPageTransaction\n      }\n    }\n  }\n}\n    ",""])),Z);function P(){var n=(0,d.UO)(),e=(0,l.Xc)(n.address),t=(0,o.useState)("Copy address"),x=(0,s.Z)(t,1)[0],h=(0,o.useState)(!1),v=(0,s.Z)(h,2),g=v[0],C=v[1],w=function(n){var e=(0,r.Z)((0,r.Z)({},I),n);return y.a(S,e)}({variables:{first:10,owner:e}}),b=w.loading,Z=w.data,P=(0,o.useMemo)((function(){var n;return null!==(n=null===Z||void 0===Z?void 0:Z.balances.edges.map((function(n){var e=n.node;return(0,r.Z)((0,r.Z)({},e),{},{amount:(0,i.bn)(e.amount)})})))&&void 0!==n?n:[]}),[Z]),A=(0,o.useMemo)((function(){var n;return null!==(n=null===Z||void 0===Z?void 0:Z.transactionsByOwner.edges.map((function(n){return n.node})))&&void 0!==n?n:[]}),[Z]).sort((function(n,e){var t,r;return((null===(t=(0,u.$V)(n))||void 0===t?void 0:t.getTime())||0)-((null===(r=(0,u.$V)(e))||void 0===r?void 0:r.getTime())||0)<=0?1:-1}));return b?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a.h,{}),(0,f.jsx)(j.W2,{children:(0,f.jsx)(j.VY,{children:(0,f.jsx)(j.N7,{children:(0,f.jsx)(j.sw,{children:(0,f.jsxs)(j.yt,{children:["Address:  ",(0,f.jsxs)("div",{children:[(0,f.jsx)(j.mF,{children:(0,i.g6G)(e)}),(0,f.jsx)(j.mF,{children:e})]})]})})})})})]}):(0,f.jsxs)(f.Fragment,{children:[g&&(0,f.jsx)(c.D,{onClose:function(){C(!1)},address:e}),(0,f.jsx)(a.h,{}),(0,f.jsx)(j.W2,{children:(0,f.jsxs)(j.VY,{children:[(0,f.jsx)(j.N7,{children:(0,f.jsxs)(j.sw,{children:[(0,f.jsxs)(j.yt,{children:["Address:  ",(0,f.jsxs)("div",{children:[(0,f.jsx)(j.mF,{children:(0,i.g6G)(e)}),(0,f.jsx)(j.mF,{children:e})]})]}),(0,f.jsxs)(j.P2,{onClick:function(){navigator.clipboard.writeText(e)},children:[(0,f.jsx)(j.oL,{}),(0,f.jsx)(j.u,{children:x})]}),(0,f.jsxs)(j.P2,{onClick:function(){C(!0)},children:[(0,f.jsx)(j.L,{}),(0,f.jsx)(j.u,{children:"Click to copy QR code"})]})]})}),P?(0,f.jsx)(p,{balances:Object.values(P)}):null,(0,f.jsx)("div",{style:{height:16}}),(0,f.jsx)(m,{transactions:A})]})})]})}},7253:function(n,e,t){t.d(e,{Q:function(){return i},n:function(){return s}});var r=t(3193),s=function(n){return n?"".concat(n.slice(0,6),"...").concat(n.slice(-6,n.length-1)):""},i=function(n){switch(n){case r.ruJ.Change:return"Change";case r.ruJ.Coin:return"Coin";case r.ruJ.Contract:return"Contract";case r.ruJ.ContractCreated:return"ContractCreated";case r.ruJ.Variable:return"Variable";default:return"Unknown"}}}}]);
//# sourceMappingURL=956.43778243.chunk.js.map