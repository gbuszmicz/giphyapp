import React, { Component } from 'react';
import { 
  ListView
} from 'react-native';
import { shallow, mount, render } from "enzyme";
import { expect, spy } from "chai";
import ListResults from "../ListResults";

describe('<ListResults />', () => {

  it('should use a ListView', () => {
    const props = {
      entries: []
    };
    const component = shallow(<ListResults {...props} />);
    expect(component.node.type).to.equal(ListView);
  });

});
