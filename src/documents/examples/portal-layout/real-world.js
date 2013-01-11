AUI().use('aui-portal-layout', function(A) {
  var proxyNode = A.Node.create('<div class="aui-portal-layout-proxy"></div>');
  var sb = A.one('.sidebar');
  var DDM = A.DD.DDM;
  var color = '';

  var portalLayout = new A.PortalLayout({
    dragNodes: '.portlet',
    dropNodes: '#myPortalLayout',
    proxyNode: proxyNode,
    validDrops: [ '#myPortalLayout' ]
  });

  var PortletItem = function() {
    PortletItem.superclass.constructor.apply(this, arguments);
  };
  window.porti = PortletItem;

  PortletItem.NAME = 'PortletItem';
  PortletItem.ATTRS = {
    dd: {
      value: false
    },
    itemContainer: {
      value: sb
    },
    proxyNode: {
      value: proxyNode
    }
  };

  A.extend(PortletItem, A.PortalLayout, {
    _getAppendNode: function() {
      var instance = this;
      instance.appendNode = DDM.activeDrag.get('node').clone();
      color = instance.appendNode.get('id');

      return instance.appendNode;
    }
  });

  var portletList = new PortletItem({
    dragNodes: '.portlet-item',
    dropNodes: '#myPortalLayout',
    isTarget: false,
    validDrops: [ '#myPortalLayout' ]
  });

  portletList.on('drag:end', function(event) {
    var newPortlet = A.Node.create('<div class="portlet ' + color + '">New Portlet</div>');

    if (portletList.appendNode && portletList.appendNode.inDoc()) {
      portletList.appendNode.replace(
        newPortlet
      );
    }
  });

  rmDrops;
  function rmDrops() {
    var targets = A.Object.values(DDM.targets);

    for(i = 0; i<targets.length; i++) {
      var node = targets[i];

      if(node._state.data.node.value.hasClass('nodrop')) {
        var nodrop = node._groups;
        A.Object.setValue(nodrop, ['portal-layout'], false);
        console.log(nodrop);
      }
    }
  };

  //console.log(A.Object.values(A.DD.DDM.targets));
  setTimeout( rmDrops, 100);
  //rmDrops();

});