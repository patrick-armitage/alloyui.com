AUI().use('aui-portal-layout', function(A) {
  var proxyNode = A.Node.create('<div class="aui-portal-layout-proxy"></div>');
  var sb = A.one('.sidebar');

  var portalLayout = new A.PortalLayout({
    dragNodes: '.portlet',
    dropNodes: '#myPortalLayout',
    proxyNode: proxyNode,
    validDrops: [ '#myPortalLayout' ]
  });

  //New Portlet Generation
  var DDM = A.DD.DDM;
  var color = '';

  var PortletItem = function() {
    PortletItem.superclass.constructor.apply(this, arguments);
  };

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
    },
    isTarget: {
      value: false
    },
    validDrops: {
      value: [ '#myPortalLayout' ]
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
  DDM.removeTarget(10);
});