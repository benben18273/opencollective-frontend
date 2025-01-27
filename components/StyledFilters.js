import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Flex } from './Grid';
import StyledButton from './StyledButton';
import { Span } from './Text';

const FilterButton = styled(StyledButton).attrs({
  buttonSize: 'tiny',
  buttonStyle: 'standard',
})`
  font-size: 14px;
  font-weight: 400;
  height: ${props => props.heignt};
  padding: ${props => props.padding};
  background: #f9fafb;
  border-color: white;
  color: ${props => props.theme.colors.black[800]};

  ${props =>
    props['data-selected'] &&
    css`
      &,
      &:hover,
      &:focus {
        background-color: ${props => props.theme.colors.primary[100]};
        border: 1px solid ${props => props.theme.colors.primary[700]};
        color: ${props => props.theme.colors.primary[900]};
        box-shadow: none;
      }
    `}

  &:active {
    background-color: ${props => props.theme.colors.primary[100]};
    color: ${props => props.theme.colors.primary[800]};
  }
  &:focus {
    border: 2px solid #050505;
  }
`;

const ButtonContainer = styled.span`
  ${props =>
    props.flexGrow &&
    css`
      flex-grow: ${props.flexGrow};
    `}
`;

const defaultGetLabel = filter => filter;

/**
 * A controlled component to display a list of filters.
 */
const StyledFilters = ({
  filters,
  onChange,
  disabled = false,
  getLabel = defaultGetLabel,
  selected = undefined,
  minButtonWidth = undefined,
  buttonHeight = '34px',
  buttonPadding = '4px 14px',
  buttonGrow = undefined,
  ...flexProps
}) => {
  return (
    <Flex data-cy="filters" px={1} py={1} css={{ overflowX: 'auto' }} gap="8px" {...flexProps}>
      {filters.map(filter => {
        const isSelected = filter === selected;
        return (
          <ButtonContainer key={filter} flexGrow={buttonGrow}>
            <FilterButton
              data-cy={`filter-button ${filter.toLowerCase()}`}
              onClick={isSelected ? undefined : () => onChange(filter)}
              data-selected={isSelected}
              minWidth={minButtonWidth}
              disabled={disabled}
              height={buttonHeight}
              padding={buttonPadding}
            >
              <Span whiteSpace="nowrap">{getLabel(filter)}</Span>
            </FilterButton>
          </ButtonContainer>
        );
      })}
    </Flex>
  );
};

StyledFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  getLabel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  disabled: PropTypes.bool,
  buttonGrow: PropTypes.any,
  minButtonWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  buttonHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  buttonPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default StyledFilters;
