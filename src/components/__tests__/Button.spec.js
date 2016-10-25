import React from 'react';
import { 
  Text, 
  TouchableOpacity ,
  StyleSheet
} from 'react-native';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Button from '../Button';

describe('<Button />', () => {

  it('should render', () => {
    const wrapper = shallow(        
      <Button 
        style={styles.text} 
        icon={null} 
        title="Cats"
        onSearch={() => 'Cats'} 
      />
    );
    expect(wrapper.containsMatchingElement(TouchableOpacity)).to.equal(true);
    expect(wrapper.containsMatchingElement(Text)).to.equal(true);
  });

  it('should contain text', () => {
    const wrapper = shallow(        
      <Button 
        style={styles.text} 
        icon={null} 
        title="Cats"
        onSearch={() => 'Cats'} 
      />
    );
    expect(wrapper.find(Text).props().children).to.equal('Cats');
  });

  it("should handle button presses", () => {
    const onSearch = sinon.spy();
    const wrapper = shallow(        
      <Button 
        style={styles.text} 
        icon={null} 
        title="Cats"
        onSearch={onSearch} 
      />
    );
    wrapper.simulate('press');
    expect(onSearch.calledOnce).to.equal(true);
  });
})

const styles = StyleSheet.create({
  text: {
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    backgroundColor: '#f5f8fa'
  }
});