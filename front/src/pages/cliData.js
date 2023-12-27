const allCliList=[
'show virtualac config',
'show ip ospf route count',
'show packet capture status',
'show ipv6 dhcp relay statistics',
'show webauth directarp',
'show len',
'show info analy all colon',
'show info analy all more blank',
'show supervlan',
'show upgrade autosync',
'show ms mc',
'show ip dhcp server statistics',
'show capwap state',
'show rdnd pairs',
'show webauth directhost',
'show webauth directsite',
'show defend word drop',
'show defendzone word word counters',
'show securityzone word word',
'show ip fpm statistics',
'show accesslists summary',
'show webauth rdport',
'show firewallgroup',
'show directvlan',
'show aaa methodlist',
'show arp static',
'show version slot',
'show mac',
'show macaddresstable count',
'show dot1x',
'show arp counter',
'show apconfig summary',
'show acconfig client',
'show ip dhcp binding ip',
'show ip dhcp binding',
'show ip dhcp snooping binding',
'show interface status',
'show interfaces status',
'show ip interface brief',
'show virtualac dualactive bfd',
'show virtualac dualactive aggregateport',
'show ip route ospf',
'show ip route isis',
'show interface vlan',
'show interfaces vlan',
'show interface bvi num',
'show bfd neighbors',
'show bfd neighbor',
'show bfd neighbors vrf word',
'show clock',
'show addressmanage',
'show ip ref route statistics',
'show ip ref adjacency statistics',
'show device id',
'show virtualac topology',
'show vlan',
'show bgp cidronly',
'show net statistic',
'show ipv6 interface vlan num',
'show hosts',
'show webauth control',
'show arp',
'show radius dynamicauthorizationextension statistics',
'show ip ospf neighbor',
'show ip ospf neighbo',
'show ip pim sparsemode neighbor',
'show ip pim densemode neighbor',
'show ipv6 ref route statistics',
'show ipv6 ref adjacency statistics',
'show ip dhcp snooping',
'show ip igmp snooping querier',
'show webauth user all',
'show webauth template',
'show webauth user name word',
'show addressbind',
'show interface arpcheck list',
'show dot1x guardipsegment',
'show antiarpspoofing',
'show webauth guardipsegment',
'show switch virtual dualactive bfd',
'show switch virtual dualactive aggregateport',
'show ipv6 route vrf word summary',
'show interface description',
'show interfaces description',
'show aaa domain word',
'show mac vlan num',
'show webauth user ip ip',
'show macaddresstable vlan num',
'show ip source binding',
'show bgp l2vpn evpn evi num macip ip detail',
'show bgp l2vpn evpn evi num macip detail',
'show ip route summary',
'show bgp all updategroup num hamod adjout',
'show ip route',
'show queueing wred interface dutport',
'show efm packet',
'show interface status errdisabled',
'show mls qos capacity',
'show ip dhcp snoop binding',
'show rdnd status',
'show accessgroup',
'show patch',
'show ip rip',
'show isis interface',
'show nfpp arpguard summary',
'show ssh',
'show virtualac dualactive summary',
'show radius server',
'show webauth portal',
'show ip igmp groups',
'show wlan hotbackup',
'show accesssharemonitor statistics',
'show sflow',
'show lacp summary',
'show erps rapsvlan num',
'show gvrp configuration',
'show gvrp statistics',
'show accesssharemonitor feature rule all',
'show httpupdate info version',
'show proxyarp',
'show proxyarp statistics',
'show arp detail',
'show macaddresstable',
'show ip dhcp bind',
'show ntp server',
'show ip dhcp pool',
'show web auth parameter',
'show monitor',
'show usergroup summary',
'show accesssharemonitor feature upgrade history',
'show interface vlan num',
'show hostname',
'show tunnel information',
'show bgp all summary',
'show wlan arpcheck list',
'show logging mnemoniclist',
'show usergroup mac mac',
'show usergroup authentication',
'show usergroup',
'show dot11 mbssid',
'show dldp statistic',
'show ip nat translations verbose',
'show bfd neighbors details',
'show bfd neighbors details pl3',
'show bfd neighbors details bak',
'show bfd neighbors vrf word details',
'show ip urpf interface dutport',
'show snmp user',
'show bfd neighbors ipv6 ipv6 details',
'show bfd neighbors ipv4 ip details',
'show logging config',
'show portsecurity address',
'show portsecurity binding',
'show dldp',
'show usergroup authentication more',
'show memory',
'show addressbind uplink',
'show gvrp statistics dutport',
'show ip dhcp usergroup summary',
'show rldp interface dutport',
'show rldp',
'show usergroup name word',
'show ip dhcp usergroup pool',
'show ip rns configuration',
'show track',
'show ip rip peer',
'show isis neighbors',
'show ip rns statistics',
'show switch virtual',
'show switch virtual topology',
'show switch virtual link port',
'show vsd detail',
'show vsd all',
'show webserver status',
'show cpu',
'show ip ssh',
'show arp oob',
'show ipv6 dhcp',
'show ip route ecmp',
'show ip route weight',
'show ip ospf database external advrouter ip',
'show macaddresstable notification',
'show ip route vrf word summary bak0530',
'show ip ospf num neighbor',
'show mls qos maps cosdscp',
'show mls qos maps dscpcos',
'show mls qos maps ipprecdscp',
'show version slots',
'show version detail',
'show ip igmp snooping gdatable',
'show macaddresstable maxdynamicmaccount vlan num',
'show ip route vrf word count',
'show interfaces counters rate up',
'show interfaces counters rate',
'show interface counters rate',
'show show rdnd pairs',
'show rdnd problems',
'show ipv6 ospf word neighbor',
'show cpuprotect type dot1x',
'show webauth portalcheck',
'show virtualac',
'show interface dutport counters error',
'show interface dutport counters summary',
'show redundancy state',
'show redundancy states',
'show ip ospf database nssaexternal advrouter ip',
'show dot1x user mac mac',
'show dot1x summary',
'show power',
'show ipv6 dhcp binding',
'show tcp connect',
'show temperature',
'show fan',
'show fan detail',
'show dot1x staticipseg',
'show snooping option82dot1x',
'show logging',
'show ipv6 interface brief',
'show ip route vrf word',
'show netconf session bak0911',
'show netconf session',
'show bgp all neighbors ip hamode adjin',
'show ip bgp vrf word',
'show ip bgp ip',
'show ip bgp ipmask',
'show ip bgp ip ip',
'show bgp ipv6 unicast ipv6mask',
'show bgp ipv6 unicast vrf word ipv6mask',
'show bgp ipv4 unicast vrf word ipmask',
'show ip bgp updategroup',
'show ipv6 ospf hide nsr',
'show vxlan num bak',
'show vxlan server tunnel',
'show bgp l2vpn evpn evi num macip',
'show bgp l2vpn evpn evi num inclusivemulticast',
'show ipv6 neighbors overlayrouter num',
'show ip vrf count',
'show radius parameter',
'show password policy',
'show ipv6 dhcp relaydestination all',
'show bgp gr status',
'show virtualac link port',
'show vxlan nd suppress',
'show bgp all neighbors ip',
'show bgp all neighbors ipv6',
'show bgp all updategroup',
'show bgp all updategroup num',
'show bgp all updategroup ip',
'show ipv6 neighbors vrf word',
'show ipv6 ref route',
'show ipv6 ref rout',
'show ipv6 ref rou',
'show ip vrf',
'show ipv6 ref route detail ipv6',
'show ipv6 route data',
'show bgp ipv6 unicast',
'show vxlan routeactive ipv6',
'show vxlan routeactive ipv6 vni num',
'show bgp l2vpn evpn all macip',
'show bgp l2vpn evpn all maci',
'show ipv6 route',
'show ipv6 neighbors detail overlayrouter num',
'show vxlan routebgp ipv6 vni num',
'show interface dutport counters rate',
'show arp vrf word',
'show lsm capacity',
'show acl capacity',
'show bgp nsr status',
'show version devices',
'show ip ospf nsr database count',
'show lsm interface dutport',
'show ip interface',
'show efmp fpa',
'show ipv6 route vrf word',
'show interfaces linkstatechange statistics',
'show interfaces dutport linkstatechange statistics',
'show ip source binding stickymac',
'show ip verify sour',
'show ip verify source',
'show link state group',
'show split summary',
'show ip route vrf word summary',
'show ip bgp vrf word summary',
'show vrrp brief',
'show vrrp br',
'show grpc subscr sample',
'show lacp counters',
'show interface brief',
'show priorityflowcontrol status',
'show qos bandwidth interface dutport',
'show ipv6 dhcp snooping binding',
'show savi ipv6 source binding',
'show ipv6 source binding',
'show savi ipv6 check source',
'show macaddresstable share',
'show dns proxy hosts',
'show qinq termination',
'show aggregateport loadbalance',
'show aggregateport summary inset',
'show aggregateport summary',
'show interfaces counters rate nozero',
'show ipv6 dhcp pool',
'show ipv6 source binding stickymac',
'show interfaces vlanmapping',
'show spanningtree summary',
'show lldp localinformation interface dutport',
'show lldp neighbors',
'show lldp status',
'show lldp status interface dutport',
'show lldp neighbors interface dutport',
'show isis neighbor',
'show mac share',
'show memory lowwatermark',
'show vrf',
'show mpls forwardingtable',
'show mpls ldp neighbor',
'show accesscontrol packet statistics',
'show ip ref route',
'show ip ref rou',
'show ip fib route',
'show ip fib rout',
'show ip interface vlan num',
'show ip fib route vrf word',
'show ip ref route vrf word',
'show ip route fastreroute',
'show ip ref route fastreroute',
'show ip ref adjacency',
'show ipv6 nd snooping prefix',
'show efmp capacity',
'show ipv6 route fastreroute',
'show ipv6 ref adjacency',
'show ipv6 fib route',
'show container images',
'show container stats word',
'show container',
'show ip rns operationalstate',
'show ip rns collectionstatistics',
'show ip route database',
'show ipv6 route database',
'show monitor session num',
'show acl capability',
'show mac maxdynamicmaccount vlan num',
'show nsm nhb byid num',
'show ipv6 dhcp relay destination all',
'show dot1x privatesupplicantonly',
'show dot1x probetimer',
'show ip fpm num num flow',
'show interfaces switchport backup',
'show spanningtree mst configuration',
'show vlan id num',
'show ip ref loadbalance',
'show vxlan server database',
'show mac flapping record',
'show lldp tlvconfig interface dutport',
'show mls qos queueing',
'show cpuprotect hardwarestatistics device num',
'show cpuprotect hardwarestatistics slot num',
'show vap summary',
'show cpuprotect statistics interface dutport',
'show ip flow cache',
'show cpuprotect summary',
'show ipv6 nd snooping binding',
'show savi statistic',
'show bridge ability',
'show macaddresstable all',
'show ipv6 neighbors detail',
'show ipv6 nd snooping statistics',
'show mls qos maps expcos',
'show mls qos maps expdscp',
'show mls qos maps dscpexp',
'show dot1x multimab quiet user',
'show users',
'show interfaces counters summary up',
'show issu state',
'show lldp neighbors order',
'show vpdn session',
'show vpdn tunnel pptp num',
'show vpdn log',
'show vpdn log user word',
'show role name word',
'show cpuprotect autodefend summary',
'show cpuprotect autodefend config',
'show cpuprotect autodefend conf',
'show cpuprotect autodefend config detail',
'show cpuprotect autoportdefend summary',
'show nfpp tcpsynguard summary',
'show nfpp tcpsynguard trustedhost',
'show nfpp tcpsynguard hosts',
'show issu rollbacktimer',
'show issu state detail',
'show mac all',
'show sbfd reflector discriminator',
'show cpuprotect device num',
'show cpuprotect slot num',
'show interface virtualaccess num',
'show cpuprotect hardwarestatistics device num slot num',
'show cpuprotect',
'show cpuprotect bak0601',
'show cpuprotect device num slot num',
'show ip flow export',
'show install',
'show protocolvlan ipv4',
'show nfpp arpguard hosts',
'show protocolvlan profile',
'show macvlan all',
'show macvlan interface',
'show interfaces remark',
'show ipv6 tcp connect',
'show ipv6 vrrp brief',
'show ipv6 vrrp br',
'show vxlan subport all',
'show vxlan subport vni num',
'show vxlan subport interface dutport',
'show interfaces vlan num',
'show line console num',
'show sprs vxlantable',
'show queuebuffer interface dutport slot num',
'show queuecounter interface dutport slot num',
'show isis database verbose',
'show bgp linkstate linkstate detail',
'show interfaces tunnel num',
'show interface tunnel num',
'show bfd neighbors parmconsult',
'show ipv6 mld snooping gda',
'show efm packet interface dutport',
'show mmu bufferconfig interface dutport',
'show registrationtable',
'show registrationtabl',
'show dns proxy hide qps',
'show interfaces usage up',
'show efm event link local',
'show efm event link local dutport',
'show tftpc time stat',
'show fabricinterface connectivity slot num port num',
'show fabricinterface isolate info',
'show fabricinterface monitor plan',
'show fabricinterface status slot num port num',
'show mpls forwardingtable frr',
'show mpls forwardingtable fr',
'show mpls srgb',
'show ip ospf segmentrouting srgb',
'show mpls srlb',
'show ip ospf segmentrouting srlb',
'show ip ospf segmentrouting prefixsid',
'show ip ospf segmentrouting ilm',
'show ip ospf segmentrouting il',
'show ip ospf segmentrouting i',
'show ip ospf segmentrouting adjacencysid',
'show mpls forwardingtable ilm',
'show mpls forwardingtable il',
'show mpls ldp backupfrr',
'show mpls ldp frr',
'show ip ospf segmentrouting ftn',
'show mpls forwardingtable ftn',
'show mpls forwardingtable ft',
'show bgp ipv4 flowspec',
'show bgp all neighbors',
'show bgp ipv4 flowspec neighbors',
'show mpls rib',
'show mpls ldp measure',
'show spanningtree vstp information',
'show ip ospf hide bgpls recordnlri num ip detail',
'show routemap',
'show ip rnsserver udpecho',
'show ip rns configuration num',
'show ip rns collectionstatistics num',
'show ip rns operationalstate num',
'show ip rns reactionconfiguration num',
'show ip rns reactiontrigger num',
'show ip rns statistics num',
'show track client',
'show track num',
'show isis sync',
'show vap consistencycheck global all',
'show vap consistencycheck vap num all',
'show ip ospf bgpls state',
'show mpls ldp bindings',
'show spaninfo information outflowgroup',
'show vap consistencycheck vap num',
'show outflowgroup summary',
'show outflowgroup num',
'show vxlan vnistatistics vni num',
'show vxlan statistics overlaytunnel num',
'show vxlan statistics overlaytunnel num vni num',
'show efmp counter',
'show efmp rxpnt',
'show efmp ring',
'show pcep peer',
'show pcep peer ip',
'show pcep peer statistics',
'show pcep peer ip statistics',
'show pcep lsp',
'show pcep lsp num',
'show arp ip',
'show arp detail ip',
'show ipv6 neighbors ipv6',
'show bgp ipv4 srpolicy detail word',
'show bgp ipv6 srpolicy detail word',
'show bgp ipv6 srpolicy',
'show bgp ipv4 srpolicy',
'show rdnd disable',
'show ipv6 ospf hide bgpls recordnlri num ip detail',
'show ipv6 ospf bgpls state',
'show macaddresstable address mac vni',
'show power version',
'show mmu bufferconfig queuethreshold cell interface dutport',
'show pcep',
'show interfaces dutport transceiver',
'show interface dutport transceiver',
'show mpls ldp neighbor vrf word',
'show ip ospf sync',
'show ipv6 ospf sync',
'show bgp vpnv4 unicast all',
'show bgp vpnv4 unicast al',
'show bgp vpnv6 unicast al',
'show bgp vpnv6 unicast all',
'show srp ref sidlist',
'show srp ref bsidmpls',
'show isis segmentrouting adjacencysid',
'show queuebuffer interface dutport',
'show mpls l2transport vc detail',
'show mpls l2transport vc',
'show mpls l2transport v',
'show macaddress vsi num',
'show acl capability more',
'show srv6 globalparameter',
'show ip rns twamplight statistics all testdelay',
'show ip rns twamplight statistics all testloss',
'show ip rns twamplight statistics testsession num testdelay',
'show ip rns twamplight statistics testsession num testloss',
'show ip rns twamplight configuration testsession num',
'show ip rns twamplight configuration testsession num threshold',
'show ip rns twamplight configuration all',
'show ip rns twamplight configuration all threshold',
'show ip rns twamplightresponder configuration all',
'show ip rns twamplightresponder configuration testsession num',
'show ip rns twamplight operationalstate all',
'show ip rns twamplight operationalstate testsession num',
'show ip rns twamplight operationalstate brief',
'show mac other',
'show grtd configue all',
'show grtd configue all detail',
'show smart manager policy registered',
'show smart manager policy registered statistics',
'show bgp linkstate linkstate lsclient',
'show grtd status all detail',
'show bgp l2vpn evpn all ipprefix detail',
'show smart manager detector all',
'show smart manager history events',
'show smart manager policy all',
'show mls qos status',
'show ip route vrf word bgp',
'show mpls rib vrf word',
'show arp detail vxlan',
'show grtd status all',
'show upgrade startupversion',
'show ip ospf hide bgpls recordnlri num ip',
'show ipv6 ospf hide bgpls recordnlri num ip',
'show bgp vpnv4 unicast vrf word ip',
'show hideisis route all ipv6',
'show srv6 locator',
'show srv6 locato',
'show srv6 locator word',
'show bgp l2vpn evpn all updategroup',
'show bgp vpnv4 unicast all updategroup',
'show bgp vpnv6 unicast all updategroup',
'show issu report',
'show bgp vpnv6 unicast vrf word ipv6mask',
'show bgp l2vpn evpn all ipprefix ip detail',
'show bgp l2vpn evpn all ipprefix ip detai',
'show bgp l2vpn evpn all ipprefix ipv6 detail',
'show bgp l2vpn evpn all ipprefix ipv6 detai',
'show card voltage',
'show cpu slot',
'show mpls te segmentrouting tunnel num',
'show mpls labelreach detail',
'show ipv6 nd snooping binding mac',
'show segmentrouting policy srv6',
'show redundancy pairs',
'show segmentrouting policy name word',
'show mka session interface dutport verbose',
'show macsec info interface dutport verbose',
'show mka statistics interface dutport',
'show macsec statistics interface dutport',
'show macaddresstable count interface dutport',
'show mpls l2transport vc count',
'show mpls ldp master',
'show evpn detail',
'show netconf authorization username word rulelist detail',
'show ip deny nullscan',
'show ip defense icmpflood',
'show ip defense synflood',
'show interfaces dutport counters',
'show ntp broadcastserver',
'show ntp peer',
'show ipv6 dhcp snooping binding mac',
'show ipsec proposal word',
'show ipsec manual sa word',
'show nfpp ipguard hosts statistics',
'show interfaces dutport troubleshooting',
'show accesslists num',
'show accesslists word',
'show pgbuffer interface dutport',
'show interface counters errors up',
'show loadbalanceprofile default',
'show mpls ldp parameters',
'show interfaces usage',
'show mpls ldp nsr',
'show ip flow cache statistic dev num slot num',
'show ipv6 flow cache statistic dev num slot num',
'show vrf detail word',
'show vrf detail',
'show nak counters interface dutport',
'show cnp counters interface dutport',
'show cnp counters',
'show nak counters',
'show mpls ldp neighbor all',
'show priorityflowcontrol statistics interface dutport',
'show priorityflowcontrol deadlock statistics interface dutport',
'show switch virtual link',
'show qos wredecn statistics interface dutport',
'show priorityflowcontrol statistics historytop interface dutport',
'show priorityflowcontrol status interface dutport',
'show webauth capability',
'show manuinfo',
'show ip dhcp snooping packet',
'show ipv6 dhcp snooping packet',
'show acl res',
'show isis segmentrouting ilm',
'show isis route ipv6 verbose',
'show bgp linkstate linkstate',
'show version module detail word',
'show segmentrouting policy counters',
'show segmentrouting policy name word counters',
'show srp ref bsidsrv6',
'show srv6 ref global',
'show srv6 sid counters',
'show segmentrouting policy segmentlist counters',
'show queuecounter interface dutport',
'show srv6 ref localsrv6id',
'show bgp vpnv4 unicast all summary',
'show bgp vpnv6 unicast all summary',
'show bgp ipv6 unicast all summary',
'show srp ref nhp ipv6',
'show bgp ipv6 unicast summary',
'show power fault',
'show power temperature',
'show queuecounter statistics interface dutport output',
'show stats macall all',
'show interfaces counters summary',
'show clustermonitor status',
'show internalinterface counters',
'show internalinterface status',
'show internalinterface counters errors',
'show snmp traprecord',
'show grpc server information',
'show ip ref route slot num',
'show ip ref rout slot num',
'show ip ref rou slot num',
'show ip ref adjacency slot num',
'show ip ref route fast',
'show ipv6 ref route fast',
'show efd efinterface dutport',
'show efd efinterface num',
'show efd slot num efinterface num',
'show mac dynamic',
'show bgp ipv4 unicast vrf word summary',
'show bgp ipv6 unicast vrf word summary',
'show ip pim sparsemode interface dutport detail',
'show merge summary',
'show bgp bmp summary',
'show bgp bmp neighbor',
'show ip mroute',
'show flowspec interfacegroup',
'show ip pim sparsemode interface',
'show interfaces faultinfo',
'show ip ospf segmentrouting mappingserver prefixsidmap',
'show mls qos ratelimit interface dutport',
'show qos statistics interface dutport input',
'show ip route static',
'show srv6 policy bfd echo neighbor',
'show srv6 policy sbfd neighbor',
'show loadbalance all',
'show srv6 policy statistics',
'show ipv6 urpf',
'show ip urpf',
'show ipv6 ref route statistics slot num',
'show ip ref route statistics slot num',
'show efd ip fpm statistics',
'show efd slot num ip fpm statistics',
'show efd ipv6 fpm statistics',
'show efd slot num ipv6 fpm statistics',
'show efd ip fpm counters',
'show efd ipv6 fpm counters',
'show efd slot num ip fpm counters',
'show efd slot num ipv6 fpm counters',
'show efd core',
'show efd slot num core',
'show portqueue statistics interface dutport',
'show portqueue',
'show dldp ipv6 statistic',
'show vxlan server route',
'show mac vni num',
'show wred word',
'show efd ef hpage poolinfo',
'show efd slot num ef hpage poolinfo',
'show efd ef hpage slabinfo',
'show efd slot num ef hpage slabinfo',
'show macaddresstable dynamic interface dutport',
'show egressqueue trafficstatistics interface dutport',
'show fabricinterface status',
'show fabricinterface status linkhistory device num slot num',
'show fabricinterface status linkhistory slot num',
'show efd efb',
'show efd slot num efb',
'show cpldfpga version detail fan',
'show cpldfpga version detail slot',
'show cpldfpga version detail',
'show efd slot num ef hpage meminfo',
'show ipv6 ref route slot num',
'show ipv6 ref adjacency slot num',
'show efd ipv6 fpm flows filter',
'show efd slot num ipv6 fpm flows filter',
'show efd ip fpm flows filter',
'show efd slot num ip fpm flows filter',
'show interface multilink num',
'show interface serial',
'show mpls ref vc',
'show evpn evi word df result',
'show bgp l2vpn evpn all ethernetad detail',
'show bgp l2vpn evpn all',
'show virtualethernet vegroup num',
'show mpls vfi word',
'show eap num',
'show vrf brief',
'show evpn evi num dftimer state',
'show evpn evi word dftimer state',
'show hdf all',
'show hdf fault',
'show bgp ipv4 vpntarget',
'show bgp ipv4 vpntarget summary',
'show bgp l2vpn evpn all inclusivemulticast',
'show bgp l2vpn evpn all ipprefix',
'show ipv6 ospf database external',
'show ppp multilink',
'show interface pos',
'show portqueue statistics interface pos',
'show portqueue statistics interface serial',
'show bgp l2vpn evpn all macip detail',
'show evpn l2eviname word df result',
'show bgp l2vpn evpn evi l2eviname word macip detail',
'show bgp evpn evpl instanceid num',
'show bgp l2vpn evpn al',
'show isis word flexalgo num',
'show isis word flexalgo num all',
'show isis flexalgo num all',
'show isis flexalgo num',
'show bgp ipv4 vpntarget detail word',
'show interfaces pwve num',
'show isis hostname',
'show bgp vpnv4 unicast all ip',
'show bgp vpnv6 unicast all ipv6mask',
'show bgp l2vpn evpn all fromneighbor ip detail',
'show isis route ipv6 flexalgo num',
'show isis topology flexalgo num',
'show isis ipv6 topology flexalgo num',
'show bgp develop vc',
'show bgp l2vpn evpn all inclusivemulticast ip detail',
'show portqueue statistics interface multilink num',
'show evpn',
'show hqos capacity userqueue slot num input',
'show hqos flowqueue profile',
'show hqos flowwred profile detail',
'show ipv6 ospf database locator advrouter ip',
'show ipv6 ospf database erouter advrouter ip',
'show ipv6 ospf database router advrouter ip',
'show ipv6 ospf database intraprefix advrouter ip',
'show mac bridgedomain num',
'show rlog',
'show ip bgp neighbors ip',
'show ip bgp neighbors ipv6',
'show mpls forwardingtable detail',
'show srv6 sid ipv6mask',
'show srv6 dynamic sid hold',
'show efmp path id num',
'show elaborate refsrv6 srv6id num',
'show mpls ref ilm inlabel num detail',
'show ip route ecmp ip',
'show ip rdfilter',
'show evpn l2eviname word dftimer state',
'show ip flow cache dev num slot num',
'show ptp config',
'show ip msdp summary',
'show ptp interface dutport',
'show ptp utc',
'show ip msdp sacache',
'show ipv6 ospf database ri',
'show srv6 policy classicstate include localend',
'show demux mapping',
'show demux mapping lane num',
'show aggregateport member activestatus',
'show detector packettrace capturefiles',
'show detector packettrace result',
'show detector packettrace profile word',
'show grpc openconfig subscription',
'show interfaces status errdisabled',
'show isis num srv6 tilfanode mac',
'show isis num route ipv6 verbose',
'show ipv6 ospf interface dutport',
'show ip udp',
'show ipv6 udp',
'show ipfix interface statistics',
'show ipfix interface statistics origin',
'show mmu egressqueue trafficstatistics interface dutport',
'show portqueue statistics interface tunnel num',
'show ifit static',
'show ip dhcp relay snooping bindtable',
'show cfn session',
'show flexe client',
'show flexe group',
'show evpn redundancy bd word',
'show evpn redundancy evpl word',
'show mpls bfd neighbor',
'show mpls bfd neighbor word peerip ip detail',
'show modechannel flowqueue statistics interface dutport output',
'show isis num route ipv6mask verbose',
'show flexe client clientindex num',
'show dcn memory',
'show clock source',
'show rlog slot num',
'show interfaces dialer num',
'show ip rnsserver configuration num',
'show dldp interface dutport',
'show dldp arp',
'show dldp num icmp',
'show ipv6 ospf word error packet interface dutport',
'show isis word error interface dutport',
'show cfm rmep',
'show cfm mep',
'show ifit statistic',
'show macaddresstable flapping bridgedomain',
'show rbschannel num',
'show wlan hotbackup ip',
'show processes cpu',
'show install detail',
'show mls qos ratelimit',
'show spaninfo information globalinfo',
'show ip ospf',
'show isis gracefulrestart',
'show ipv6 ref route vrf word',
'show ipv6 ref route vr word',
'show lsm interface',
'show efd ef hpage meminfo',
'show ipv6 ref route detail device num slot num',
'show traffic policy',
'show traffic policy word',
'show fabricinterface status linkhistory',
'show tcp statistics',
'show ipv6 tcp statistics',
'show ip packet statistic total',
'show ipv6 packet statistic total',
'show ip ref route detail ip',
'show traffic classifier',
'show traffic classifier word',
'show traffic behavior word',
'show cpuprotect planedefend all statistics device num',
'show cpuprotect planedefend all statistics slot num',
'show cpuprotect planedefend all config',
'show heap stats',
'show crypto key mypubkey sm2',
'show lldp localinformation',
'show ipv6 ref route detail device num',
'show bfd neighbors client static',
'show service',
'show ip igmp groups detail',
'show ipv6 pim sparsemode interface dutport detail',
'show ip ref detail',
'show routeres usage all',
'show hdf detailinfo slot num mainnode FABRIC INF childnode protocol',
'show policymap statistics name word output',
'show port maclink',
'show ip route static bfd',
'show isis database detail',
'show ipv6 pim sparsemode interface',
'show ps',
'show ip ospf tilfa node',
'show efd slot num efhpage poolinfo',
'show bgp egressengineering',
'show bgp l2vpn evpn all summary',
'show ipv6 pathmtu',
'show ipv6 pathmtu vrf',
'show evpn mac routingtable evi num',
'show ipv6 route ipv6mask',
'show ipv6 rout ipv6mask',
'show ipv6 route isis',
'show srv6 policy policyname word',
'show srv6 policy',
'show srv6 policy trafficstatistics',
'show srv6 policy trafficstatistics policyname word',
'show isis srv6 tilfanode',
'show isis srv6 avoidmicroloop',
'show cfn sip',
'show evpn mac conflict',
'show evpn mac mobility',
'show srv6 policy classicstate include localendx',
'show cpuprotect autoportdefend statistics',
'show ipv6 pim sparsemode track',
'show ip dhcp history',
'show snooping forward',
'show lldp neighbors detail',
'show ip bgp summary',
'show spanning tree',
'show ip bgp neighbors',
'show ipv6 dhcp server statistics',
'show ipv6 dhcp pool word',
'show ipv6 local pool',
'show ipv6 nd',
'show ipv6 neighbors',
'show ipv6 neighbors verbose',
'show ipv6 ref statistics',
'show ntp status',
'show ipv6 vrrp',
'show vrrp',
'show vrf ipv6',
'show erps',
'show interface switchport backup detail',
'show protocolvlan',
'show snmp',
'show ipv6 route summary',
'show vrrp packet statistics',
'show cwmp configuration',
'show cwmp status',
'show snmp host',
'show ip nat translations',
'show ip nat translation',
'show tcp statistics bak',
'show mac vlan all',
'show clink statistic',
'show file systems',
'show spanning tree counters',
'show spanning tree summary',
'show ipv6 ospf neighbor',
'show ipv6 ospf neighbo',
'show ipv6 dhcp server hide scc',
'show isis neighbors detail',
'show ipv6 neighbors statistics',
'show ip igmp snooping',
'show isis counter',
'show ip igmp snooping statistics',
'show isis topology',
'show ipv6 interface vlan num rainfo',
'show ipv6 packet statistics total',
'show dot11 ratelimit wlan',
'show arp timeout',
'show ipv6 interface tunnel num',
'show ipv6 address',
'show ipv6 interface dutport',
'show upgrade file flash word',
'show upgrade status',
'show upgrade autosync123',
'show upgrade history',
'show switch id',
'show interfaces dutport',
'show interface dutport',
'show version',
'show bgp all',
'show bgp al',
'show ip bgp',
'show voice vlan oui',
'show voice vlan',
'show ip dhcp relay userinfo table',
'show cpu core detail',
'show dcn',
'show ip ospf dcninfo',
'show ip pim sparsemode track',
'show flexe group num',
'show evpn l2eviname word bd num',
'show flexe physical interface dutport',
'show bgp vpnv4 unicast all neighbor',
'show isis num srv6 tilfanode level2 mac',
'show clock config',
'show srv6 policy flowgroup groupname word',
'show mpls forwardingtable interfaces dutport',
'show bfd neighbors vrf word ipv4 ip detail',
'show bfd neighbors vrf word ipv6 ipv6 detail',
'show dcn neinfo',
'show ip route vrf word fastreroute',
'show ipv6 route vrf word fastreroute',
'show bgp keychain',
'show evpn l2eviname word evpl num',
'show ptp all',
'show cpuprotect autoportdefend attacked summary',
'show ipv6 dhcp relay userinfo table',
'show ipv6 dhcp relay snooping bindtable',
'show ipv6 dhcp relay source',
'show rlogstatus log',
'show rlogstatus slot num log',
'show pppoe session',
'show clock source interfaces dutport',
'show vxlan',
'show vxlan num',
'show vxlan mode',
'show vxlan mac',
'show vxlan udpport',
'show vxlan global',
'show mgmt virtual',
'show aggregateport capacity',
'show loadbalanceprofile',
'show eee interface dutport',
'show l2protocoltunnel gvrp',
'show l2protocoltunnel stp',
'show mls qos scheduler',
'show cpuprotect type type',
'show eee interfaces status',
'show macaddresstable agingtime',
'show macaddresstable maxdynamicmaccount interface dutport',
'show macaddresstable notification interface dutport',
'show interface switchport',
'show vlan privatevlan',
'show dot1qtunnel interfaces dutport',
'show dot1qtunnel',
'show translationtable interfaces dutport',
'show translationtable',
'show registrationtable interfaces dutport',
'show trafficredirect',
'show trafficredirect interfaces dutport',
'show frametag tpid',
'show frametag tpid interfaces dutport',
'show innerprioritytrust',
'show innerprioritytrust interfaces dutport',
'show interface dutport remark',
'show interfaces macaddressmapping',
'show nacauthoruser',
'show interface aggregateport num',
'show interfaces aggregateport num',
'show interfaces dutport transceiver diagnosis',
'show interface dutport transceiver diagnosis',
'show interfaces dutport transceiver alarm',
'show interface dutport transceiver alarm',
'show interfaces dutport transceiver manuinfo',
'show interface dutport transceiver manuinfo',
'show interfaces dutport transceiver bak0901',
'show interface dutport transceiver bak0901',
'show interface overlaytunnel num',
'show interfaces overlaytunnel num',
'show interface overlayrouter num',
'show interfaces overlayrouter num',
'show interface dot1qtunnel',
'show interfaces dot1qtunnel',
'show interface counters up',
'show interface dutport counters',
'show interface aggregateport num counters',
'show interfaces counters up',
'show accesslists',
'show switch virtual config',
'show ip accessgroup',
'show ipv6 trafficfilter',
'show mac accessgroup',
'show expert accessgroup',
'show classmap',
'show policymap',
'show policymap interface dutport',
'show redirect',
'show mls qos interface policers',
'show macvlan static',
'show macvlan dynamic',
'show macvlan vlan num',
'show macvlan macaddress mac',
'show runningconfig interface dutport',
'show runningconfig interface vlan num',
'show mac count',
'show sntp',
'show poe interfaces configuration',
'show poe interfaces status',
'show poe powersupply',
'show switchmode status',
'show ip ospf database external advrouter word',
'show ip dhcp conflict',
'show lldp tlvconfig interface',
'show ip source binding dhcpsnooping',
'show dot1x portcontrol',
'show dot1x user diag mac',
'show interface counters rate up',
'show ip route vrf name',
'show ip rns twamplight statistics testsession num total',
]

export default allCliList
