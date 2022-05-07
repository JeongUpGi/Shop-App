import React, {Component} from 'react';
import styled from 'styled-components';

class LeftRightCenter extends Component {
  render() {
    return (
      <HeaderContainer>
        <LeadingIcon onPress={this.props.leadingLeftAction}>
          {this.props.leadingLeftIcon}
        </LeadingIcon>

        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <LeadingIcon onPress={this.props.leadingRightAction}>
          {this.props.leadingRightIcon}
        </LeadingIcon>
      </HeaderContainer>
    );
  }
}

class centerRight extends Component {
  render() {
    return (
      <HeaderContainer>
        <EmptySizedBox />
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <ActionIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </ActionIcon>
      </HeaderContainer>
    );
  }
}

class centerOnly extends Component {
  render() {
    return (
      <HeaderContainer>
        <EmptySizedBox />
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <EmptySizedBox />
      </HeaderContainer>
    );
  }
}

/* Empty -- Empty -- ActionIcon(rightIcon) */
class ActionOnly extends Component {
  render() {
    return (
      <HeaderContainer>
        <EmptySizedBox />
        <EmptySizedBox />
        <LeadingIcon>{this.props.leadingIcon}</LeadingIcon>
      </HeaderContainer>
    );
  }
}

/* LeadingIcon -- Empty -- ActionIcon(rightIcon) */
class LeftRight extends Component {
  render() {
    return (
      <HeaderContainer>
        <LeadingIcon>{this.props.leadingIcon}</LeadingIcon>
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <LeadingIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </LeadingIcon>
      </HeaderContainer>
    );
  }
}

/* LeadingIcon -- CenterTitle -- Empty */
class LeftCenter extends Component {
  render() {
    return (
      <HeaderContainer>
        <LeadingIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </LeadingIcon>
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <EmptySizedBox />
      </HeaderContainer>
    );
  }
}

/* LeadingIcon -- Empty -- Empty */
class LeadingOnly extends Component {
  render() {
    return (
      <HeaderContainer>
        <LeadingIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </LeadingIcon>
        <EmptySizedBox />
        <EmptySizedBox />
      </HeaderContainer>
    );
  }
}

export default HeaderBar = {
  leftRightCenter: LeftRightCenter,
  leftRight: LeftRight,
  actionOnly: ActionOnly,
  leadingOnly: LeadingOnly,
  leftCenter: LeftCenter,
  centerRight: centerRight,
  centerOnly: centerOnly,
};

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 56px;
  background-color: ${props => props.theme.colors.mainColor};
  justify-content: space-between;
  padding-horizontal: 16px;
`;
const LeadingIcon = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
`;

const EmptySizedBox = styled.View`
  height: 24px;
  width: 24px;
`;

const CenterTitle = styled.Text`
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.44px;
`;
const ActionIcon = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
`;
